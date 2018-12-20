const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
                .then(() => console.log('Connected to MongoDB...'))
                .catch(err => console.log('Could not conmect to MongoDB..',err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId){
    const course = await Course.findOne({_id: courseId});
    course.author.name = 'Janusz Stolorz';
    course.save();
}

async function updateAuthorEx(courseId, name){
    await Course.update({
        _id: courseId
    },{
        $set: {
            'author.name': name
        }
    });
}


async function addAuthor(courseId, author){
    const course = await Course.findOne({_id: courseId});
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findOne({_id: courseId});
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

createCourse('Node Course Advanced',[
    new Author({name: 'Janusz'}),
    new Author({name: 'Iwona'})
] );
//updateAuthor('5c1a0dcfb8621c300bfb39d9');
//updateAuthorEx('5c1a0dcfb8621c300bfb39d9','John Smith');
