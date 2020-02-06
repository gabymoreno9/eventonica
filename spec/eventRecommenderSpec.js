describe("EventRecommender", () => {
  const { EventRecommender, User, Event } = require('../eventonicaPart1Classes.js'); // Update with your class names and file name
  let er; 

  beforeEach(() => {
    er = new EventRecommender();
  });

  describe("addEvent", () => {
    it("adds a new Event to the system", () => {
      er.addEvent("Anne Concert", "11/09/2020", "Music");
      expect(er.events.length).toEqual(1);
      expect(er.events[0].title).toEqual("Anne Concert"); // what are some other things you can test?
    });
  });

  describe("addUser", () => {
    it("adds a new User to the system", () => {
      er.addUser("Jennifer")
      expect(er.users.length).toEqual(1);
      expect(er.users[0].username).toEqual("Jennifer")
    });
  });

  describe("saveUserEvent", () => {
    it("adds an event to a user's personal event array", () => {
      er.addEvent("Anne Concert", "11/09/2020", "Music");
      er.addUser("Jennifer");
      er.saveUserEvent("Jennifer", "Anne Concert");
      expect(er.users[0].username).toEqual("Jennifer");
      expect(er.users[0].savedEvents.length).toEqual(1);
      expect(er.users[0].savedEvents[0].title).toEqual("Anne Concert");
    });
  });

  describe("deleteUser", () => {
    it("removes a User from the system", () => {
      er.addUser("Jennifer");
      expect(er.users.length).toEqual(1);
      er.deleteUser("Jennifer");
      expect(er.users.length).toEqual(0);
    });
  });

  describe("deleteEvent", () => {
    it("removes the event from the system", () => {
      er.addEvent("Anne Concert");
      expect(er.events.length).toEqual(1);
      er.deleteEvent("Anne Concert");
      expect(er.events.length).toEqual(0);
    });
  });
});