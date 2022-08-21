# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

    # !!!!!!
    Friendship.destroy_all
    Conversation.destroy_all
    Server.destroy_all
    Channel.destroy_all
    ServerJoin.destroy_all
    Message.destroy_all
    User.destroy_all



    #DEMO USERS

    u1 = User.create!({email: "demo1@gmail.com", password: "demo12", username: "demo1", fourdigit_id: "0001", status: "offline"})
    u2 = User.create!({email: "demo2@gmail.com", password: "demo12", username: "demo2", fourdigit_id: "0002", status: "offline"})
    u3 = User.create!({email: "demo3@gmail.com", password: "demo12", username: "demo3", fourdigit_id: "0003", status: "offline"})
    u4 = User.create!({email: "demo4@gmail.com", password: "demo12", username: "demo4", fourdigit_id: "0004", status: "offline"})
    u5 = User.create!({email: "demo5@gmail.com", password: "demo12", username: "demo5", fourdigit_id: "0005", status: "offline"})

    #BOTS
    u6 = User.create!({email: "cleverbot@gmail.com", password: "botbot", username: "Aria Bot", fourdigit_id: "0000", status: "online"})

    u7 = User.create!({email: "anthonie@gmail.com", password: "111111", username: "ant", fourdigit_id: "0313", bio:"nah bro"})
    u8 = User.create!({email: "lucy@gmail.com", password: "lucy12", username: "lucy", fourdigit_id: "4059", status: "online", bio:"You should see this!"})
    u9 = User.create!({email: "bro@gmail.com", password: "111111", username: "bro", fourdigit_id: "4023", status: "idle"})
    u10 = User.create!({email: "cxcharlie@gmail.com", password: "123456", username: "helios", fourdigit_id: "1234", status: "idle"})

    u11 = User.create!({email: "filler@gmail.com", password: "111111", username: "Alec", fourdigit_id: "1390", status: "busy"})
    u12 = User.create!({email: "filler1@gmail.com", password: "111111", username: "Alex", fourdigit_id: "4022", status: "online"})
    u13 = User.create!({email: "filler2@gmail.com", password: "111111", username: "Cindy", fourdigit_id: "5995", status: "idle"})
    u14 = User.create!({email: "filler3@gmail.com", password: "111111", username: "Adam", fourdigit_id: "0404"})
    u15 = User.create!({email: "filler4@gmail.com", password: "111111", username: "H", fourdigit_id: "6665"})
    u16 = User.create!({email: "filler5@gmail.com", password: "111111", username: "L", fourdigit_id: "2034"})
    u17 = User.create!({email: "filler6@gmail.com", password: "111111", username: "Zuzu", fourdigit_id: "1111"})
    u18 = User.create!({email: "filler7@gmail.com", password: "111111", username: "Wendy", fourdigit_id: "5960"})
    u19 = User.create!({email: "filler8@gmail.com", password: "111111", username: "Abby", fourdigit_id: "3094"})
    u20 = User.create!({email: "filler9@gmail.com", password: "111111", username: "Evie", fourdigit_id: "4950"})
    u21 = User.create!({email: "fillerz@gmail.com", password: "111111", username: "Brian", fourdigit_id: "9592"})
    u22 = User.create!({email: "fillera@gmail.com", password: "111111", username: "Jacob", fourdigit_id: "0942"})
    u23 = User.create!({email: "fillerw@gmail.com", password: "111111", username: "Quang", fourdigit_id: "1234"})
    u24 = User.create!({email: "fillerf@gmail.com", password: "111111", username: "Danny", fourdigit_id: "1114"})
    u25 = User.create!({email: "fillerfvgmail.com", password: "111111", username: "Peter", fourdigit_id: "6904"})
    u26 = User.create!({email: "filler16@gmail.com", password: "111111", username: "Paulo", fourdigit_id: "4498"})
    u27 = User.create!({email: "filler23@gmail.com", password: "111111", username: "Chris", fourdigit_id: "8888"})
    u28 = User.create!({email: "filler84@gmail.com", password: "111111", username: "Mike", fourdigit_id: "8843"})


    Friendship.create!({user_id: u1.id, friend_id: u3.id})
    Friendship.create!({user_id: u1.id, friend_id: u5.id})
    Friendship.create!({user_id: u1.id, friend_id: u2.id})
    Friendship.create!({user_id: u5.id, friend_id: u4.id})

    Friendship.create!({user_id: u3.id, friend_id: u1.id})
    Friendship.create!({user_id: u5.id, friend_id: u1.id})
    Friendship.create!({user_id: u2.id, friend_id: u1.id})
    Friendship.create!({user_id: u4.id, friend_id: u5.id})

    c1 = Conversation.create!({user1_id: u1.id, user2_id: u3.id})
    c2 = Conversation.create!({user1_id: u1.id, user2_id: u4.id})
    c3 = Conversation.create!({user1_id: u1.id, user2_id: u5.id})


    c4 = Conversation.create!({user1_id: u1.id, user2_id: u6.id})
    c5 = Conversation.create!({user1_id: u1.id, user2_id: u7.id})
    c6 = Conversation.create!({user1_id: u1.id, user2_id: u8.id})
    c7 = Conversation.create!({user1_id: u1.id, user2_id: u9.id})
    c8 = Conversation.create!({user1_id: u10.id, user2_id: u1.id})
    c9 = Conversation.create!({user1_id: u1.id, user2_id: u11.id})
    c10 =Conversation.create!({user1_id: u1.id, user2_id: u12.id})
    c11 = Conversation.create!({user1_id: u1.id, user2_id: u13.id})
    c12 = Conversation.create!({user1_id: u1.id, user2_id: u14.id})
    c13 = Conversation.create!({user1_id: u1.id, user2_id: u15.id})
    c14 = Conversation.create!({user1_id: u1.id, user2_id: u16.id})
    c15 = Conversation.create!({user1_id: u1.id, user2_id: u17.id})
    c16 = Conversation.create!({user1_id: u1.id, user2_id: u18.id})
    c17 = Conversation.create!({user1_id: u1.id, user2_id: u19.id})
    c18 = Conversation.create!({user1_id: u1.id, user2_id: u20.id})
    

    s1 = Server.create!({server_link: "appacademy", owner_id: u1.id, name: "App Academy"})
    s2 = Server.create!({server_link: "leagueoflegends", owner_id: u4.id, name: "League of Legends"})
    s3 = Server.create!({server_link: "bob", owner_id: u4.id, name: "Bob's Home"})
    s4 = Server.create!({server_link: "bob1", owner_id: u4.id, name: "Bob's Home"})
    s5 = Server.create!({server_link: "bob2", owner_id: u4.id, name: "Bob's Home"})
    s6 = Server.create!({server_link: "bob3", owner_id: u4.id, name: "Bob's Home"})
    s7 = Server.create!({server_link: "bob4", owner_id: u4.id, name: "Bob's Home"})
    s8 = Server.create!({server_link: "bob5", owner_id: u4.id, name: "Bob's Home"})
    s9 = Server.create!({server_link: "bob6", owner_id: u4.id, name: "Bob's Home"})
    s10 = Server.create!({server_link: "bob7", owner_id: u4.id, name: "Bob's Home"})
    s11 = Server.create!({server_link: "bob8", owner_id: u4.id, name: "Bob's Home"})
    s12 = Server.create!({server_link: "bob9", owner_id: u4.id, name: "Bob's Home"})
    s13 = Server.create!({server_link: "bob10", owner_id: u4.id, name: "Bob's Home"})
    s14 = Server.create!({server_link: "bob11", owner_id: u4.id, name: "Bob's Home"})
    s15 = Server.create!({server_link: "bob12", owner_id: u4.id, name: "Bob's Home"})

    ch1 = Channel.create!({server_id: s1.id, name:"help", description:"Ask for help here!"})
    ch2 = Channel.create!({server_id: s1.id, name:"memes"})
    ch3 = Channel.create!({server_id: s2.id, name:"league", description:"Talk about LoL or other Riot games"})
    ch4 = Channel.create!({server_id: s2.id, name:"find-players", description:"Find other players!"})

    ServerJoin.create!({user_id: u1.id, server_id: s2.id, nickname: "bob"})
    ServerJoin.create!({user_id: u1.id, server_id: s3.id, nickname: "bobby"})
    ServerJoin.create!({user_id: u2.id, server_id: s1.id, nickname: "SpongeBob"})
    ServerJoin.create!({user_id: u2.id, server_id: s2.id})
    ServerJoin.create!({user_id: u2.id, server_id: s3.id})
    ServerJoin.create!({user_id: u3.id, server_id: s1.id})
    ServerJoin.create!({user_id: u8.id, server_id: s1.id})
    ServerJoin.create!({user_id: u12.id, server_id: s1.id})
    ServerJoin.create!({user_id: u22.id, server_id: s1.id})
    ServerJoin.create!({user_id: u24.id, server_id: s2.id})
    ServerJoin.create!({user_id: u10.id, server_id: s2.id})






    ServerJoin.create!({user_id: u1.id, server_id: s4.id})
    ServerJoin.create!({user_id: u1.id, server_id: s5.id})
    ServerJoin.create!({user_id: u1.id, server_id: s6.id})
    ServerJoin.create!({user_id: u1.id, server_id: s7.id})
    ServerJoin.create!({user_id: u1.id, server_id: s8.id})
    ServerJoin.create!({user_id: u1.id, server_id: s9.id})
    ServerJoin.create!({user_id: u1.id, server_id: s10.id})
    ServerJoin.create!({user_id: u1.id, server_id: s11.id})
    ServerJoin.create!({user_id: u1.id, server_id: s12.id})
    ServerJoin.create!({user_id: u1.id, server_id: s13.id})
    ServerJoin.create!({user_id: u1.id, server_id: s14.id})
    ServerJoin.create!({user_id: u1.id, server_id: s15.id})


    Message.create!({content: "First!", author_id:u1.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "Second!", author_id:u2.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "Hello!", author_id:u1.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "Hi!", author_id:u2.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "This is working!", author_id:u1.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "At least we hope you see this", author_id:u2.id, location_id: ch1.id, location_type: "Channel"})
    Message.create!({content: "Hello?", author_id:u3.id, location_id: ch2.id, location_type: "Channel"})
    Message.create!({content: "Anyone home?", author_id:u3.id, location_id: ch2.id, location_type: "Channel"})

    Message.create!({content: "I hate this game?", author_id:u2.id, location_id: ch4.id, location_type: "Channel"})
    Message.create!({content: "Me too", author_id:u4.id, location_id: ch4.id, location_type: "Channel"})



    Message.create!({content: "Sup it's bob.", author_id:u4.id, location_id: c2.id, location_type: "Conversation"})
    Message.create!({content: "Hey bob! How you doing mate", author_id:u1.id, location_id: c2.id, location_type: "Conversation"})
    Message.create!({content: "Not your business", author_id:u4.id, location_id: c2.id, location_type: "Conversation"})
    m = Message.create!({content: "oh...", author_id:u1.id, location_id: c2.id, location_type: "Conversation"})
    m.image.attach(io: File.open("app/assets/images/original.jpeg"), filename: 'sadpusheen.jpeg')

    m2 = Message.create!({content: "Just testing!", author_id:u3.id, location_id: c1.id, location_type: "Conversation"})

    m2.image.attach(io: File.open("app/assets/images/cat.jpeg"), filename: 'cat.jpeg')
    Message.create!({content: "Please work lol", author_id:u5.id, location_id: c3.id, location_type: "Conversation"})

    Message.create!({content: "Nice to meet you! I am Aria Bot!", author_id: u6.id, location_id: c4.id, location_type: "Conversation"})