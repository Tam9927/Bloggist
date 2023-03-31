const {BlogRepository} = require("../../repository/blog.repository")
const {testDB} = require("../testDB")
const {Blog}= require("../../model/blog.model")

class TestStory {
    constructor(story) {
      this.title = story.title;
      this.description = story.description;
      this.authorId = story.authorId;
      this.id = '6';
    }
}

describe("Testing Stories Repository", ()=> {

    describe('Testing findAllStories function: ', () => {
        it('should return a list of stories: ', async () => {
          // Arrange
          const size = 3;
          const skip = 0;
         jest.spyOn(BlogRepository,"findAll").mockImplementation(({limit,offset}))=>
         testDB.slice(offset,offset+limit)
         
         );

