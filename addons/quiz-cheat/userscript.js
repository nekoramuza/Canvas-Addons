/*
    this is the original code from the original Canvas Cheat with
    improvements that make it work with the new CanvasAddon system
    and also a couple fixes and styling improvements
*/

import addonApi from "/addon-api/core.js"

addonApi.injectCss('quiz-cheat')

// get all questions
var questions = $('.text')

// make a link that opens in a new tab
function makeLink(text, label = 'Lookup') {
    return $(`<a class="canvas_cheat btn btn-primary" href="https://google.com/search?q=${urlify(text)}" target="_blank">${label}</a>`)
}

// make a link that copies the text to the clipboard
function makeCopyLink(text, label = 'Copy') {
    return $(`<a class="canvas_cheat copy_text btn btn-primary" href="${text}" target="_blank">${label}</a>`)
}

// remove extra spaces and newlines
function normalize(text, deenterify = true) {
    var noenter = text.replace(/\n/g, ' ')
    return (deenterify ? noenter : text)
        .replace(/ +/g, ' ')
}

// make some characters url friendly
function urlify(text) {
    return text.replace(/\"/g, '%22')
        .replace(/ /g, '%20')
}

questions.each((i, e) => {
    var question = $(e)
    var question_text = $('.question_text', question)
    var text = normalize(question_text.text())
    var answers = $('.answer', $('.answers', question))

    if (text !== '') {
        let lookup = makeLink(text, 'Lookup Question')
        question_text.append(lookup)

        let copy = makeCopyLink(text, 'Copy Question')
        question_text.append(copy)
    }

    var answer_text = []

    answers.each((i, e) => {
        answer_text.push(normalize((i + 1) + '. ' + $(e)
            .text()))
    })

    var full_question = [
        text + ':',
        ...answer_text
    ]

    var buttons = $('<div class="canvas_cheat btns"></div>')

    let lookup = makeLink(normalize(full_question.join(' ')))
    buttons.append(lookup)

    let copy = makeCopyLink(normalize(full_question.join('\n'), false))
    buttons.append(copy)

    question.append(buttons)
})

// make copy links copy text when clicked
$('.copy_text')
    .click(function(e) {
        e.preventDefault();
        var copyText = $(this)
            .attr('href');

        document.addEventListener('copy', function(e) {
            e.clipboardData.setData('text/plain', copyText);
            e.preventDefault();
        }, true);

        document.execCommand('copy');
    });