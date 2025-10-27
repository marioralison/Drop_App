import io, { Socket } from "socket.io-client";

export const socket = io("http://192.168.88.39:8080");

let roomsInitialized = false;

export interface MessageProps {
    id_expediteur: number;
    id_receiveur: number;
    content: string;
}

export interface IdUserInRoom {
    id_expediteur: number;
    id_receiveur: number;
}

export const sendMessage = (message : MessageProps) => {
    socket.emit('send_message', message);
};

export const joinRoom = (id_users : IdUserInRoom) => {
    socket.emit('join_room', id_users)
}

export const initializeRooms = async (
    currentUserId: number, 
    targetUsers: number[]
): Promise<void> => {
    if (roomsInitialized) {
        console.log('⏭️ Rooms déjà initialisées');
        return;
    }

    targetUsers.forEach((userId) => {
        joinRoom({
            id_expediteur: currentUserId,
            id_receiveur: userId
        });
        console.log(`Room créée entre ${currentUserId} et ${userId}`);
    });

    roomsInitialized = true;
    console.log('✅ Toutes les rooms initialisées');
};

export const resetRooms = () => {
    roomsInitialized = false;
};