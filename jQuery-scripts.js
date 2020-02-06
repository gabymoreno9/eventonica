

$(document).ready( () => {
    const eventRecommender = new EventRecommender(); 
    eventRecommender.addUser("Michelle");
    eventRecommender.addUser("Ariel");
    eventRecommender.addUser("Robyn");
    eventRecommender.addUser("Hannah");
    eventRecommender.addUser("Sergio");

    eventRecommender.addEvent("Montigo Concert", "February 24, 2020", "Music");
    eventRecommender.addEvent("Latinx in Tech", "March 4, 2020", "Technology");
    eventRecommender.addEvent("Corgi Conference", "April 1, 2020", "Lifestyle");
    eventRecommender.addEvent("Rebecca Sawyer: Live", "May 21, 2020", "Music");



    for (let i = 0; i < eventRecommender.users.length; i++) {
        let user = eventRecommender.users[i];
        $('#all-users').append('<li>' + user.username + '</li>');
    }

    for (let i = 0; i < eventRecommender.events.length; i++) {
        let event = eventRecommender.events[i];
        $('#all-events').append('<li>' + event.title + '  |  ' + event.date + '  |  ' + event.category + '</li>');
    }

    //Show and Adding a user
    $("#add-user input[type='submit']").click(function(e) {
        //this is to prevent the page from reloading
        e.preventDefault();
        // so when we click we want it to push the new user onto
        // the users array
        let username = $("#add-user input[type='text']").val();
        $("#add-user input[type='text']").val('');
        eventRecommender.addUser(username)
        $('#all-users').append('<li>' + username + '</li>');
    })

    //Deleting a user
    $("#delete-user input[type='submit']").click(function(e) {
        //this is to prevent the page from reloading
        e.preventDefault();
        // so when we click we want it to push the new user onto
        // the users array
        let username = $("#delete-user input[type='text']").val();
        $("#delete-user input[type='text']").val('');
        eventRecommender.deleteUser(username)
        $('#all-users li').each(function(){
            if ($(this).html() === username) {
                $(this).remove();
            }
        });
    })

    //Show, Add Events
    $("#add-event input[type='submit']").click(function(e) {
        //this is to prevent the page from reloading
        e.preventDefault();
        // so when we click we want it to push the new user onto
        // the users array
        let eventName = $("#add-event #add-event-name").val();
        let eventDate = $("#add-event #add-event-date").val();
        let eventCategory = $("#add-event #add-event-category").val();
        $("#add-event input[type='text']").val('');
        eventRecommender.addUser(eventName, eventDate, eventCategory);
        $('#all-events').append('<li>' + eventName + '  |  ' + eventDate + '  |  ' + eventCategory + '</li>');
    })

     //Deleting an event
     $("#delete-event input[type='submit']").click(function(e) {
        //this is to prevent the page from reloading
        e.preventDefault();
        // so when we click we want it to push the new user onto
        // the users array
        let eventName = $("#delete-event input[type='text']").val();
        $("#delete-event input[type='text']").val('');
        eventRecommender.deleteEvent(eventName);

        if ($('#all-events li:contains("' + eventName + '")').length === 0) {
            alert("huh");
        }

        $('#all-events li').each(function(){
            if ($(this).html().split('  |  ')[0] === eventName) {
                $(this).remove();
            }
        });
    });

    // Search for events
    $("#date-search input[type='submit']").click(function(e) {
        e.preventDefault();
        let date = $("#date-search input[type='text']").val();
        let results = eventRecommender.findEventsByDate(date);
    
        // Reset the results area so it doesn't keep adding more lines every time you click the button
        $("#date-search h4").html("Results:");
        for (let i = 0; i < results.length; i++) {
            $("#date-search h4").append('<li>' + results[i].title + '</li>');
        }
    });

    $("#category-search input[type='submit']").click(function(e) {
        e.preventDefault();
        let category = $("#category-search input[type='text']").val();
        let results = eventRecommender.findEventsByCategory(category);
    
        // Reset the results area so it doesn't keep adding more lines every time you click the button
        $("#category-search h4").html("Results:");
        for (let i = 0; i < results.length; i++) {
            $("#category-search h4").append('<li>' + results[i].title + '</li>');
        }
    });

     //Saving event for user
     $("#save-user-event input[type='submit']").click(function(e) {
        e.preventDefault();
   
        let username = $("#save-user-event #save-user-id").val();
        let eventTitle = $("#save-user-event #save-event-id").val();
        eventRecommender.saveUserEvent(username, eventTitle);
        $("#save-user-event input[type='text']").val('');

        $('#all-users').html('');
        for (let i = 0; i < eventRecommender.users.length; i++) {
            let user = eventRecommender.users[i];
            let eventNames = user.savedEvents.map(function(event) { return event.title });
            
            let events = ''
            if (eventNames.length > 0) {
                events = '  |   Attending: ' + eventNames.join(', ');
            }
            $('#all-users').append('<li>' + user.username + events + '</li>');
        }
    })


});