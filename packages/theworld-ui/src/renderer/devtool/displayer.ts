import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
// https://learnku.com/articles/26231
// const ANSI_KEYS = {
//     ENTER: 'E',
//     TAB: 'H',
// };
const CSI_KEYS = {
    ARROW_UP: 'A',
    ARROW_DOWN: 'B',
    ARROW_LEFT: 'D',
    ARROW_RIGHT: 'C',
};

export enum TerminalLevel {
    SUCCESS = 'success',
    FAILED = 'FAILED',
    WARNING = 'WARNING',
    INFO = 'INFO',
    START = 'START',
}

const SHORT_CUT_CODE = 192;

interface CursorSegment {
    before: string;
    after: string;
}

export interface Handler {
    (msg: string, printer?: (msg: string, level: TerminalLevel) => void): any;
}

export default class TerminalDisplayer {
    private _hasInput = false;
    private _input = '';
    private _cursor = 0;
    public term: Terminal;
    private startTag = '~$ ';
    private _enterHandlers: Array<Handler> = [];
    private _dom: HTMLElement;
    constructor() {
        this.initTerm();
        this.bindEvent();
    }

    mount(target: string) {
        this._dom = document.querySelector(target);
        if (this._dom) {
            this.term.open(this._dom as HTMLElement);
        }
    }

    initTerm() {
        this.term = new Terminal({
            rendererType: 'canvas', // 渲染类型
            //   rows: 40, // 行数
            convertEol: true, // 启用时，光标将设置为下一行的开头
            scrollback: 10, // 终端中的回滚量
            cursorBlink: true, // 光标闪烁
        });
        this.printLine();
    }

    printLine() {
        if (this._hasInput) {
            this.term.write('\n');
        }
        this.print(this.startTag, TerminalLevel.START);
    }

    print(msg: string, level: TerminalLevel = TerminalLevel.INFO) {
        if (!msg) {
            return;
        }
        switch (level) {
            case TerminalLevel.FAILED:
                this._printError(msg);
                break;
            case TerminalLevel.SUCCESS:
                this._printSuccess(msg);
                break;
            case TerminalLevel.WARNING:
                this._printWarning(msg);
                break;
            case TerminalLevel.INFO:
                this._printInfo(msg);
                break;
            case TerminalLevel.START:
                this._printStart(msg);
                break;
        }
    }

    _printSuccess(msg: string): void {
        this.term.write(`\x1b[38;2;33;186;69m${msg}`);
    }

    _printError(msg: string): void {
        this.term.write(`\x1b[38;2;255;0;0m${msg}`);
    }
    _printWarning(msg: string): void {
        this.term.write(`\x1b[38;2;251;189;8m${msg}`);
    }

    _printInfo(msg: string): void {
        this.term.write(`\x1b[38;2;33;133;208m${msg}`);
    }

    _printStart(msg: string): void {
        this.term.write(`\x1b[38;2;100;53;201m${msg}`);
    }

    _goBack(step: number): void {
        this.term.write(`\x1b[${step}${CSI_KEYS.ARROW_LEFT}`);
    }

    _goForward(step: number): void {
        this.term.write(`\x1b[${step}${CSI_KEYS.ARROW_RIGHT}`);
    }

    bindEvent(): void {
        this.term.onData(this.handleInputData.bind(this));
        // 一些键盘快捷事件
        window.addEventListener('keyup', e => {
            const code = e.keyCode || e.which;
            switch (code) {
                case SHORT_CUT_CODE:
                    this._dom && (this._dom.hidden = !this._dom.hidden);
                    break;
            }
        });
    }

    handleInputData(msg: string): void {
        !this._hasInput && (this._hasInput = true);
        const code = msg.charCodeAt(0);
        if (code === 27) {
            switch (msg) {
                case '\x1b[A': {
                    break;
                }
                case '\x1b[B': {
                    break;
                }
                case '\x1b[C': {
                    if (this._cursor < this._input.length) {
                        this._cursor += 1;
                        this._goForward(1);
                    }
                    break;
                }
                case '\x1b[D': {
                    if (this._cursor > 0) {
                        this._cursor -= 1;
                        this._goBack(1);
                    }
                    break;
                }
            }
        } else if (code < 32 || code === 127) {
            switch (msg) {
                case '\r': {
                    this.fireEnter();
                    break;
                }
                case '\x7F': {
                    this._cursor > 0 && this.deleteInput();
                    break;
                }
                case '\t': {
                    this.term.write('    ');
                    break;
                }
            }
        } else {
            this.addInput(msg);
        }
    }

    getCursorSegment(): CursorSegment {
        return {
            before: this._input.substr(0, this._cursor),
            after: this._input.substr(this._cursor),
        };
    }

    private _printState() {
        console.log('input is ', this._input);
        console.log('cursor is ', this._cursor);
    }

    private deleteInput(): void {
        this.term.write('\b \b');
        const { before, after } = this.getCursorSegment();
        this._input = before.substr(0, before.length - 1) + after;
        for (let i = 0; i < after.length; i++) {
            this.print(after[i]);
        }
        this.term.write(' ');
        this._goBack(after.length + 1);
        this._cursor -= 1;
        // this._printState();
    }

    private addInput(msg: string): void {
        const { before: beforeStr, after: afterStr } = this.getCursorSegment();
        this._input = beforeStr + msg + afterStr;
        // 保证视图和数据一致, 需要重写后面部分
        this.print(msg);
        for (let i = 0; i < afterStr.length; i++) {
            this.print(afterStr[i]);
        }
        // 复原光标
        afterStr.length && this._goBack(afterStr.length);
        this._cursor += 1;
        // this._printState();
    }

    private fireEnter() {
        this.printLine();
        if (this._input) {
            this._enterHandlers.forEach(handler => {
                handler.call(this, this._input, this.print.bind(this));
                this.printLine();
            });
            this._input = '';
            this._cursor = 0;
        }
    }

    onEnter(cb: Handler) {
        this._enterHandlers.push(cb);
    }
}
