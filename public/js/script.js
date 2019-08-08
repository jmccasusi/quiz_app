$(() => {
    $('.q-card').hide();
    $('.q-card-1').show();
    $('.q-link-1').addClass('q-link-selected');

    $('#add-option-btn').on('click', () => {
        $('#answerOptionList').append($('<li>').append($('<input>').attr('type', 'text').attr('placeholder', 'Option').attr('name', 'options'), ('&nbsp;&nbsp;'), $('<input>').attr('type', 'radio').attr('name', 'correctAnswerIndex').attr('value', $('#answerOptionList').children().length), ('&nbsp;&nbsp;'), $('<span>').text('Correct Answer')));
    })

    $('.q-link').on('click', (event) => {
        // console.log($(event.currentTarget).attr('data'))
        $('.q-link').removeClass('q-link-selected');
        $(event.currentTarget).addClass('q-link-selected');
        $('.q-card').hide();
        $(`#${$(event.currentTarget).attr('data')}`).show();
    })

    $('.q-next-btn').on('click', (event) => {
        $('.q-link').removeClass('q-link-selected');
        $(`.q-link-${$(event.currentTarget).attr('next')}`).addClass('q-link-selected');
        $('.q-card').hide();
        $(`.q-card-${$(event.currentTarget).attr('next')}`).show();
    })

    $('.q-prev-btn').on('click', (event) => {
        $('.q-link').removeClass('q-link-selected');
        $(`.q-link-${$(event.currentTarget).attr('prev')}`).addClass('q-link-selected');
        $('.q-card').hide();
        $(`.q-card-${$(event.currentTarget).attr('prev')}`).show();
    })
})