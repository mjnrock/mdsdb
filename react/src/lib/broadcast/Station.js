import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";
import Channel from "./Channel";

export default class Station extends EventEmitter {
    constructor(channels = [], { id } = {}) {
        super();
        this.id = id || uuidv4();

        this.channels = new Map();

        if(channels.length) {
            if(Array.isArray(channels[ 0 ])) {
                this.channels = new Map(channels);
            } else if(typeof channels[ 0 ] === "string" || channels[ 0 ] instanceof String) {
                for(let name of channels) {
                    this.newChannel(name);
                }
            }
        }
    }

    newChannel(name, { subscribors = [] } = {}) {
        const channel = new Channel(subscribors);

        this.channels.set(name, channel);
    }
    hasChannel(name) {
        return this.channels.has(name);
    }
    getChannel(name) {
        return this.channels.get(name);
    }
    setChannel(name, channel) {
        if(channel instanceof Channel) {
            return this.channels.set(name, channel);
        }
    }

    broadcast(thisArg, ...args) {
        for(let channel of this.channels.values()) {
            channel.invoke.call(channel, thisArg, ...args);
        }

        return this;
    }

    invoke(channelName, thisArg, ...args) {
        const channel = this.channels.get(channelName);

        if(channel instanceof Channel) {
            channel.invoke.call(channel, thisArg, ...args);
        }

        return this;
    }

    subscribors(channelName) {
        const channel = this.channels.get(channelName);

        if(channel instanceof Channel) {
            return channel.subscribors;
        }

        return [];
    }

    join(channel, fn) {
        if(typeof fn === "function") {
            this.channels.get(channel).join(fn);
        }
    }
    leave(channel, fn) {
        this.channels.get(channel).leave(fn);
    }

    static get $() {
        if(!Station.Instance) {
            Station.Instance = new Station();
        }

        return Station.Instance;
    }
};