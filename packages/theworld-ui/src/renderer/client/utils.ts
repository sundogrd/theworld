type MessagePayload = {
    [key: string]: any;
};

type Message = {
    type: string;
    payload: MessagePayload;
};

export function checkDataFormat(data: string) {
    const trimedData = data.trim();
    const parts = trimedData.split(' ').filter(data => data);
    const isValid = parts.every((part, idx) => {
        if (!idx) {
            return part[0] === '@';
        }
        return (
            part[0] !== ':' &&
            part[part.length - 1] !== ':' &&
            part.indexOf(':') > -1
        );
    });
    return isValid;
}

export function decodeMessage(message: string): Message {
    const parts = message.split(' ').filter(msg => msg);
    const ret: Message = {
        type: '',
        payload: {},
    };
    parts.forEach((part, idx) => {
        if (!idx) {
            ret.type = part.slice(1);
        } else {
            const [key, value] = part.split(':');
            ret.payload[key] = value;
        }
    });
    return ret;
}
