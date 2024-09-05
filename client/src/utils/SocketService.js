import io from 'socket.io-client';

class Socket {
    constructor() {
        this.socket = io('http://localhost:8080');
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }
    emit(event, data) {
        this.socket.emit(event, data);
    }
    off(event) {
        this.socket.off(event);
    }
}

export default new Socket();