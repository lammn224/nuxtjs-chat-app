// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

export default socket
