const url = "http://localhost:3000"

$(document).ready(function() {
  let userToken = ''; // Variable to store user token

  $('#startButton').click(function() {
    userToken = $('#tokenInput').val();
    if (userToken) {
      console.log('User token: ' + userToken);
      switchToGameScreen();
    } else {
      alert('Please enter a token.');
    }
  });

  $('#guessInput').keypress(function(event) {
    if (event.which === 13) { // Enter key pressed
      $('#guessOutput').text($(this).val());
      let v = $(this).val();
      $('#guessInput').val('');

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: userToken, guess: v})
      }).then(response => response.json())

      .then(data => {
        console.log(data)
        update(data)
      })
    }
  });

  $('#testButton').click(function() {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: userToken, next: true})
    }).then(response => response.json())

    .then(data => {
      console.log(data)
      update(data)
    })
  });

  function switchToGameScreen() {
    $('#welcomeScreen').hide();
    $('#gameScreen').show();
    main();
  }

  function main() {
    request = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: userToken})
    }).then(response => response.json())

    request.then(data => {
      console.log("Current image: " + data.current_image)
      console.log(data.images[data.current_image])
      console.log(data)
      update(data)
    })
  }

  function update(data) {
    if (data.done) {
      $('#gameScreen').hide();
      $('#testScreen').show();

      if (data.final_test == true) {
        $('#testButton').hide();
        $('#testOutput').text("You finished the final test in " + data.attempts + " attempts. You're done and thank you for participating!!");
      } else {
        $('#testOutput').text("You finished the test in " + data.attempts + " attempts. Get ready for the next one");
      }
    } else {
      $('#testScreen').hide();
      $('#gameScreen').show();
    }

    $('#gameImage').attr('src', url + "/images/" + data.images[data.current_image]);
    $('#wordBank').text(data.labels.join(' '));
  
    if (data.text.includes('Correct')) {
      $('#guessOutput').css('color', 'green');
    } else if (data.text.includes('Incorrect')) {
      $('#guessOutput').css('color', 'red');
    } else {
      $('#guessOutput').css('color', 'black');
    }

    $('#guessOutput').text(data.text);
  }
});

