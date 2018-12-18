

getCustomer(1)
    .then(
      customer => {
          console.log('Customer: ', customer)
          if(customer.isGold){
              getTopMovies()
                  .then(movies => {
                      console.log('Top movies: ', movies)
                      sendEmail(customer.email, movies)
                          .then(result => console.log('Sending email ... ', result))
                          .catch();
                  })
                  .catch();
          }
      }
    )
    .catch();


function getCustomer(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'janusz',
                isGold: true,
                email: 'olo@op.org'
            });
        },3000);
    });
}

function getTopMovies(){
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            resolve(['movie1','movie2']);
        });
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([email, movies]);
        }, 3000);
    });
}



