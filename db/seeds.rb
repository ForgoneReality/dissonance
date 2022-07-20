# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

    # !!!!!!
    # User.destroy_all

    #DEMO USERS

    User.create!({email: "demo1@gmail.com", password: "demo12", username: "demo1", fourdigit_id: "0001", status: "offline"})
    User.create!({email: "demo2@gmail.com", password: "demo12", username: "demo2", fourdigit_id: "0002", status: "offline"})
    User.create!({email: "demo3@gmail.com", password: "demo12", username: "demo3", fourdigit_id: "0003", status: "offline"})
    User.create!({email: "demo4@gmail.com", password: "demo12", username: "demo4", fourdigit_id: "0004", status: "offline"})
    User.create!({email: "demo5@gmail.com", password: "demo12", username: "demo5", fourdigit_id: "0005", status: "offline"})

    #BOTS
    User.create!({email: "cleverbot@gmail.com", password: "botbot", username: "Aria Bot", fourdigit_id: "0000", status: "online"})

    User.create!({email: "anthonie@gmail.com", password: "111111", username: "ant", fourdigit_id: "0313", bio:"nah bro"})
    User.create!({email: "lucy@gmail.com", password: "lucy12", username: "lucy", fourdigit_id: "4059", status: "online", bio:"You should see this!"})
    User.create!({email: "bro@gmail.com", password: "111111", username: "bro", fourdigit_id: "4023", status: "idle"})
    User.create!({email: "cxcharlie@gmail.com", password: "123456", username: "helios", fourdigit_id: "1234", status: "idle"})

    User.create!({email: "filler@gmail.com", password: "111111", username: "Alec", fourdigit_id: "1390", status: "busy"})
    User.create!({email: "filler1@gmail.com", password: "111111", username: "Alex", fourdigit_id: "4022", status: "online"})
    User.create!({email: "filler2@gmail.com", password: "111111", username: "Cindy", fourdigit_id: "5995", status: "idle"})
    User.create!({email: "filler3@gmail.com", password: "111111", username: "Adam", fourdigit_id: "0404"})
    User.create!({email: "filler4@gmail.com", password: "111111", username: "H", fourdigit_id: "6665"})
    User.create!({email: "filler5@gmail.com", password: "111111", username: "L", fourdigit_id: "2034"})
    User.create!({email: "filler6@gmail.com", password: "111111", username: "Zuzu", fourdigit_id: "1111"})
    User.create!({email: "filler7@gmail.com", password: "111111", username: "Wendy", fourdigit_id: "5960"})
    User.create!({email: "filler8@gmail.com", password: "111111", username: "Abby", fourdigit_id: "3094"})
    User.create!({email: "filler9@gmail.com", password: "111111", username: "Evie", fourdigit_id: "4950"})
    User.create!({email: "fillerz@gmail.com", password: "111111", username: "Brian", fourdigit_id: "9592"})
    User.create!({email: "fillera@gmail.com", password: "111111", username: "Jacob", fourdigit_id: "0942"})
    User.create!({email: "fillerw@gmail.com", password: "111111", username: "Quang", fourdigit_id: "1234"})
    User.create!({email: "fillerf@gmail.com", password: "111111", username: "Danny", fourdigit_id: "1114"})
    User.create!({email: "fillerfvgmail.com", password: "111111", username: "Peter", fourdigit_id: "6904"})
    User.create!({email: "filler16@gmail.com", password: "111111", username: "Paulo", fourdigit_id: "4498"})
    User.create!({email: "filler23@gmail.com", password: "111111", username: "Chris", fourdigit_id: "8888"})
    User.create!({email: "filler84@gmail.com", password: "111111", username: "Mike", fourdigit_id: "8843"})


    Friendship.create!({user_id: 1, friend_id: 3})
    Friendship.create!({user_id: 1, friend_id: 5})
    Friendship.create!({user_id: 1, friend_id: 2})
    Friendship.create!({user_id: 5, friend_id: 4})

    Friendship.create!({user_id: 3, friend_id: 1})
    Friendship.create!({user_id: 5, friend_id: 1})
    Friendship.create!({user_id: 2, friend_id: 1})
    Friendship.create!({user_id: 4, friend_id: 5})

    Conversation.create!({user1_id: 1, user2_id: 3})
    Conversation.create!({user1_id: 1, user2_id: 4})
    Conversation.create!({user1_id: 1, user2_id: 5})


    Conversation.create!({user1_id: 1, user2_id: 6})
    Conversation.create!({user1_id: 1, user2_id: 7})
    Conversation.create!({user1_id: 1, user2_id: 8})
    Conversation.create!({user1_id: 1, user2_id: 9})
    Conversation.create!({user1_id: 1, user2_id: 10})
    Conversation.create!({user1_id: 1, user2_id: 11})
    Conversation.create!({user1_id: 1, user2_id: 12})
    Conversation.create!({user1_id: 1, user2_id: 13})
    Conversation.create!({user1_id: 1, user2_id: 14})
    Conversation.create!({user1_id: 1, user2_id: 15})
    Conversation.create!({user1_id: 1, user2_id: 16})
    Conversation.create!({user1_id: 1, user2_id: 17})
    Conversation.create!({user1_id: 1, user2_id: 18})
    Conversation.create!({user1_id: 1, user2_id: 19})
    Conversation.create!({user1_id: 1, user2_id: 20})
    



    Server.create!({server_link: "appacademy", owner_id: 1, name: "App Academy"})
    Server.create!({server_link: "leagueoflegends", owner_id: 4, name: "League of Legends"})
    Server.create!({server_link: "bob", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob1", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob2", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob3", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob4", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob5", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob6", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob7", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob8", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob9", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob10", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob11", owner_id: 4, name: "Bob's Home"})
    Server.create!({server_link: "bob12", owner_id: 4, name: "Bob's Home"})

    Channel.create!({server_id: 1, name:"general"})
    Channel.create!({server_id: 1, name:"help", description:"Ask for help here!"})
    Channel.create!({server_id: 1, name:"memes"})
    Channel.create!({server_id: 2, name:"general", description:"Talk about anything, League or not"})
    Channel.create!({server_id: 2, name:"league", description:"Talk about LoL or other Riot games"})
    Channel.create!({server_id: 2, name:"find-players", description:"Find other players!"})

    ServerJoin.create!({user_id: 1, server_id: 2})
    ServerJoin.create!({user_id: 1, server_id: 1})
    ServerJoin.create!({user_id: 1, server_id: 3})
    ServerJoin.create!({user_id: 2, server_id: 1})
    ServerJoin.create!({user_id: 2, server_id: 2})
    ServerJoin.create!({user_id: 2, server_id: 3})
    ServerJoin.create!({user_id: 3, server_id: 1})
    ServerJoin.create!({user_id: 4, server_id: 2})
    ServerJoin.create!({user_id: 4, server_id: 3})

    ServerJoin.create!({user_id: 1, server_id: 4})
    ServerJoin.create!({user_id: 1, server_id: 5})
    ServerJoin.create!({user_id: 1, server_id: 6})
    ServerJoin.create!({user_id: 1, server_id: 7})
    ServerJoin.create!({user_id: 1, server_id: 8})
    ServerJoin.create!({user_id: 1, server_id: 9})
    ServerJoin.create!({user_id: 1, server_id: 10})
    ServerJoin.create!({user_id: 1, server_id: 11})
    ServerJoin.create!({user_id: 1, server_id: 12})
    ServerJoin.create!({user_id: 1, server_id: 13})
    ServerJoin.create!({user_id: 1, server_id: 14})
    ServerJoin.create!({user_id: 1, server_id: 15})


    Message.create!({content: "First!", author_id:1, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Second!", author_id:2, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Hello!", author_id:1, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Hi!", author_id:2, location_id: 1, location_type: "Channel"})
    Message.create!({content: "This is working!", author_id:1, location_id: 1, location_type: "Channel"})
    Message.create!({content: "At least we hope you see this", author_id:2, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Hello?", author_id:3, location_id: 2, location_type: "Channel"})
    Message.create!({content: "Anyone home?", author_id:3, location_id: 2, location_type: "Channel"})

    Message.create!({content: "I hate this game?", author_id:2, location_id: 4, location_type: "Channel"})
    Message.create!({content: "Me too", author_id:4, location_id: 4, location_type: "Channel"})



    Message.create!({content: "Sup it's bob.", author_id:4, location_id: 2, location_type: "Conversation"})
    Message.create!({content: "Hey bob! How you doing mate", author_id:1, location_id: 2, location_type: "Conversation"})
    Message.create!({content: "Not your business", author_id:4, location_id: 2, location_type: "Conversation"})
    m = Message.create!({content: "oh...", author_id:1, location_id: 2, location_type: "Conversation"})
    m.image.attach(io: File.open("app/assets/images/original.jpeg"), filename: 'sadpusheen.jpeg')

    m2 = Message.create!({content: "Just testing!", author_id:3, location_id: 1, location_type: "Conversation"})

    m2.image.attach(io: File.open("app/assets/images/cat.jpeg"), filename: 'cat.jpeg')
    Message.create!({content: "Please work lol", author_id:5, location_id: 3, location_type: "Conversation"})

    Message.create!({content: "Nice to meet you! I am cleverbot!", author_id: 6, location_id: 4, location_type: "Conversation"})