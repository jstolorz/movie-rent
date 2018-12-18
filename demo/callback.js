console.log('Before');

getUser(1)
    .then(user => getRepo(user.username))
    .then(repo => showRepo(repo))
    .catch(err => console.log('Error', err.message));

console.log('After');

function showRepo(repo){
    console.log(repo);
}

function getUser(id) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Reading user from database...');
            resolve({id: id, username: 'janusz'});
        }, 3000);

    });


}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['repo1','repo2']);
        },2000);
    });


}