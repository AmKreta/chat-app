window.addEventListener('load', function (event) {
    document.body.style.height = `${window.innerHeight}px`;
    document.body.style.width = `${window.innerWidth}px`;

    var socket = io();

    socket.on('message_from_server', function ({ name,text }) { 
        createMessage('receiver', text, name);
    });

    document.querySelector('#send').addEventListener('click', (e) => {
        e.preventDefault();
        var text = document.querySelector('#chat');
        if (text.value === '') {
            alert('text-area empty!!');
        }
        else { 
            var name = document.querySelector('#userName').value;
            createMessage('sender', text.value, name);
            socket.emit('message_from_client', { name: name, text: text.value });
            text.value = '';
        }
    });


    const createMessage = (option, text,name) => {
        /*option is sender or reveiver*/
        var div = document.createElement('div');
        div.setAttribute('class', 'chat');

        var p = document.createElement('p');
        p.setAttribute('class', `chat_text ${option}`);
        
        p.innerHTML = `<span class='username'>${name}:</span><br>${text}`;
        
        div.appendChild(p);
        document.querySelector('main').appendChild(div);
    }

    
    
});