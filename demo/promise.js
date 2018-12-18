
const p = new Promise((resolve, reject) => {
    resolve(1);
});

p.then(result => console.log('Resulr: ', result))
.catch(err => console.log('Error ', err.message));


