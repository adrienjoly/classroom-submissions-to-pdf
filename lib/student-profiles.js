const groups = require('../groups.json')

var studentIndex = {}

Object.keys(groups).forEach((classe) => {
  require('../students-classe-' + classe + '.json')
    .students
    .forEach((student) => studentIndex[student.userId] = student.profile)
})

exports.getStudentById = (id) => studentIndex[id]
