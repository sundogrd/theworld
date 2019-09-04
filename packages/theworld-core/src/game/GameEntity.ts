'use strict';

import * as events from 'events';
import Metadatable from './Metadatable';
import Scriptable from './Scriptable';

class GameEntity extends Scriptable(Metadatable(events.EventEmitter)) {}

export default GameEntity
