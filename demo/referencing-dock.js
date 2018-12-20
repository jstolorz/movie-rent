const mongooes = require('mongoose');

mongooes.connect('mongodb://localhost/playground')
                .then(() => console.log('Connection to MongoDB...'))
                .catch(err => console.log('Could not connect to MongoDB...',err));

const Author = mongooes.model('Author', new mongooes.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongooes.model('Course', new mongooes.Schema({
    name: String,
    author: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find()
        .populate('author', 'name -_id')
        .select('name -_id author');
    console.log(courses);
}

//createAuthor('Janusz','My bio','My web site');
//createCourse('Node Course','5c1a017e47462426f506cfbb');
listCourses();