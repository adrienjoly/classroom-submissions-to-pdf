var pdfRenderer = require('../lib/pdf-renderer')

var outputFile = '_test-pdf_output.pdf'

var students = [
  {
    name: 'a',
    source: [],
    html: 'html a',
    css: 'css a',
    js: '  js a\n\ttab',
    _gcla_subm: {}
  },
  {
    name: 'b',
    source: [],
    "_gcla_subm": {
      "courseId": "3001621381",
      "courseWorkId": "4287252912",
      "id": "CgwIw8PrzAgQsJOp_A8",
      "userId": "115955988175068143418",
      "creationTime": "2017-01-31T11:57:42.907Z",
      "updateTime": "2017-02-19T23:41:29.672Z",
      "state": "TURNED_IN",
      "late": true,
      "alternateLink": "http://classroom.google.com/c/MzAwMTYyMTM4MVpa/a/NDI4NzI1MjkxMlpa/submissions/student/MjMwODYyODkzMVpa",
      "courseWorkType": "ASSIGNMENT",
      "assignmentSubmission": {
        "attachments": [
          {
            "link": {
              "url": "http://codepen.io/tristanmachin/pen/NdyNXz/",
              "title": "Liste JS",
              "thumbnailUrl": "https://www.google.com/webpagethumbnail?c=73&s=105:70&f=0&d=http://codepen.io/tristanmachin/pen/NdyNXz/&a=AIYkKU_5bUvqCryCIQgZWCsUw7eUnGjOnw"
            }
          }
        ]
      }
    },
    "source": [
      "codepen",
      "tristanmachin",
      "NdyNXz"
    ],
    "js": "var voir = document.getElementsByClassName('voir');\nvar adresse = document.getElementsByClassName('adresse');\nvar force = document.getElementsByClassName('force');\nvar concentration = document.getElementsByClassName('concentration');\nvar categories = document.getElementsByClassName('categories');\nvar elements = document.getElementsByClassName(\"discipline\");\n\nfor (var i = 0; i < elements.length; i++) {\n  elements[i].classList.add('hidden');\n}\n//\ndocument.getElementById('adresse').onclick = function (){\n  for (var i = 0; i < adresse.length; i++){\n    adresse[i].classList.remove('hidden');\n  }\n  for (var i=0; i < force.length; i++){\n    force[i].classList.add('hidden');\n  }\n  for (var i = 0; i < concentration.length; i++){\n    concentration[i].classList.add('hidden');\n  }\n}",
    "css": "li {\n\tfont-family: Roboto;\n  list-style-type: armenian;\n}\n.hidden {\n  display: none;\n}\n.voir {\n  \n}\na {\n  cursor: pointer;\n}",
    "html": "<html lang=\"fr\">\n\t<head>\n\t\t<title>Liste dynamique</title>\n\t\t<meta charset=\"utf-8\">\n\t</head>\n\t<body>\n\t\t<ul class=\"categories\">\n      <li><a rel=\"nofollow\" rel=\"noreferrer\"class=\"voir\">Tout voir</a></li>\n\t\t\t<li><a rel=\"nofollow\" rel=\"noreferrer\"class=\"adresse voir\">Adresse</a></li>\n\t\t\t<li><a rel=\"nofollow\" rel=\"noreferrer\"class=\"force voir\">Force</a></li>\n\t\t\t<li><a rel=\"nofollow\" rel=\"noreferrer\"class=\"concentration voir\">Concentration</a></li>\n\t\t</ul>\n\t\t<ul class=\"discipline\">\n      <li class=\"adresse concentration voir discipline\">Course</li>\n\t\t\t<li class=\"adresse concentration voir discipline\">Tir à l'arc</li>\n\t\t\t<li class=\"concentration voir discipline\">Echecs</li>\n\t\t\t<li class=\"force adresse voir discipline\">Lancer de javelot</li>\n\t\t\t<li class=\"adresse concentration voir discipline\">Funambulisme</li>\n\t\t\t<li class=\"force voir discipline\">Maître Jedi</li>\n\t\t\t<li class=\"adresse force voir discipline\">Maîtrise du combat de sabre laser</li>\n\t\t\t<li class=\"adresse voir discipline\">Equitation</li>\n\t\t\t<li class=\"adresse concentration voir discipline\">Pilotage de modules de course</li>\n\t\t\t<li class=\"adresse voir discipline\">Tir au blaster</li>\n\t\t</ul>\n\t</body>\n</html>"
  },
]

var html = pdfRenderer.renderHtml(students)
//console.log(html)

pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
  console.log(err || 'Page Rendered to ' + outputFile)
})
