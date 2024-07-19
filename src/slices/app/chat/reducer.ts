import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    chats: [
        {
          id: 1,
          roomId: 1,
          usermessages: [
            {
              id: 1,
              msg: 'Good morning 😊',
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: false
            },
            {
              id: 2,
              msg: 'Good morning, How are you? What about our next meeting?',
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: true
            },
            {
              id: 3,
              msg: 'Hey, I\'m going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.',
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: true
            },
            {
              id: 4,
              msg: 'Images',
              attachments: [
                {
                  id: 1,
                  img: '/static/media/img-3.3a955905eeebf537c350.jpg'
                },
                {
                  id: 2,
                  img: '/static/media/img-2.deaf80951c8789717098.jpg'
                },
                {
                  id: 3,
                  img: '/static/media/img-5.79a95683fd73ae9a947e.jpg'
                }
              ],
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: false
            },
            {
              id: 5,
              msg: 'Yeah everything is fine. Our next meeting tomorrow at 10.00 AM',
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: false
            },
            {
              id: 6,
              msg: 'Yeah everything is fine. Our next meeting tomorrow at 10.00 AM',
              img: '/static/media/avatar-7.9a44ffe86a953c9d55a4.png',
              isSender: true
            }
          ]
        }
      ],
    errors: {}
};

const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
});

export default ChatSlice.reducer;