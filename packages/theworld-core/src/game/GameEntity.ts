'use strict';

import * as events from 'events';
import Metadatable from './Metadatable';
import Scriptable from './Scriptable';

@Metadatable
class GameEntity extends Scriptable(events.EventEmitter) {}

export default GameEntity
