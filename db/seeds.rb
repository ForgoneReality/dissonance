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
    ServerRoleJoin.destroy_all



    #DEMO USERS

    u1 = User.create!({email: "demo1@gmail.com", password: "demo12", username: "demo1", fourdigit_id: "0001", status: "offline"})
    u2 = User.create!({email: "demo2@gmail.com", password: "demo12", username: "demo2", fourdigit_id: "0002", status: "offline"})
    u3 = User.create!({email: "demo3@gmail.com", password: "demo12", username: "demo3", fourdigit_id: "0003", status: "offline"})
    u4 = User.create!({email: "demo4@gmail.com", password: "demo12", username: "demo4", fourdigit_id: "0004", status: "offline"})
    u5 = User.create!({email: "demo5@gmail.com", password: "demo12", username: "demo5", fourdigit_id: "0005", status: "offline"})

    demo_users = [u1, u2, u3, u4, u5]
    #BOTS
    u6 = User.create!({email: "cleverbot@gmail.com", password: "botbot", username: "Aria Bot", fourdigit_id: "0000", status: "online", special_id: 1})

    u7 = User.create!({email: "anthonie@gmail.com", password: "111111", username: "ant", fourdigit_id: "0313", bio:"nah bro"})
    u8 = User.create!({email: "lucy@gmail.com", password: "lucy12", username: "lucy", fourdigit_id: "4059", status: "online", bio:"You should see this!"})
    u9 = User.create!({email: "bro@gmail.com", password: "111111", username: "bro", fourdigit_id: "4023", status: "idle"})
    u10 = User.create!({email: "cxcharlie@gmail.com", password: "123456", username: "Dissonance", fourdigit_id: "0000", status: "idle"})

    u11 = User.create!({email: "filler@gmail.com", password: "111111", username: "Alec", fourdigit_id: "1390", status: "busy"})
    u12 = User.create!({email: "filler1@gmail.com", password: "111111", username: "Alex", fourdigit_id: "4022", status: "online"})
    u13 = User.create!({email: "filler2@gmail.com", password: "111111", username: "Cindy", fourdigit_id: "5995", status: "idle"})
    u14 = User.create!({email: "filler3@gmail.com", password: "111111", username: "Adam", fourdigit_id: "0404", status: "online"})
    u15 = User.create!({email: "filler4@gmail.com", password: "111111", username: "H", fourdigit_id: "6665", status: "online"})
    u16 = User.create!({email: "filler5@gmail.com", password: "111111", username: "L", fourdigit_id: "2034", status: "busy", bio: "donk a donk"})
    u17 = User.create!({email: "filler6@gmail.com", password: "111111", username: "Zuzu", fourdigit_id: "1111", status: "idle"})
    u18 = User.create!({email: "filler7@gmail.com", password: "111111", username: "Wendy", fourdigit_id: "5960", status: "online"})
    u19 = User.create!({email: "filler8@gmail.com", password: "111111", username: "Abby", fourdigit_id: "3094", status: "busy", bio: "smoge"})
    u20 = User.create!({email: "filler9@gmail.com", password: "111111", username: "Evie", fourdigit_id: "4950"})
    u21 = User.create!({email: "fillerz@gmail.com", password: "111111", username: "Brian", fourdigit_id: "9592"})
    u22 = User.create!({email: "fillera@gmail.com", password: "111111", username: "Jacob", fourdigit_id: "0942"})
    u23 = User.create!({email: "fillerw@gmail.com", password: "111111", username: "Quang", fourdigit_id: "1234"})
    u24 = User.create!({email: "fillerf@gmail.com", password: "111111", username: "Danny", fourdigit_id: "1114"})
    u25 = User.create!({email: "fillerfvgmail.com", password: "111111", username: "Peter", fourdigit_id: "6904"})
    u26 = User.create!({email: "filler16@gmail.com", password: "111111", username: "Paulo", fourdigit_id: "4498"})
    u27 = User.create!({email: "filler23@gmail.com", password: "111111", username: "Chris", fourdigit_id: "8888"})
    u28 = User.create!({email: "filler84@gmail.com", password: "111111", username: "Mike", fourdigit_id: "8843"})
    u29 = User.create!({email: "dinobot@dino.com", password: "dinodino2", username: "Dino Bot", fourdigit_id: "1337"})


    Friendship.create!({user_id: u1.id, friend_id: u3.id})
    Friendship.create!({user_id: u1.id, friend_id: u5.id})
    Friendship.create!({user_id: u1.id, friend_id: u2.id})
    Friendship.create!({user_id: u5.id, friend_id: u4.id})

    Friendship.create!({user_id: u3.id, friend_id: u1.id})
    Friendship.create!({user_id: u5.id, friend_id: u1.id})
    Friendship.create!({user_id: u2.id, friend_id: u1.id})
    Friendship.create!({user_id: u4.id, friend_id: u5.id})

    demo_users.each do |demo|
        Friendship.create!({user_id: demo.id, friend_id: u6.id})
        Friendship.create!({user_id: demo.id, friend_id: u7.id})
        Friendship.create!({user_id: demo.id, friend_id: u8.id})
        Friendship.create!({user_id: demo.id, friend_id: u9.id})
        Friendship.create!({user_id: demo.id, friend_id: u10.id})
        Friendship.create!({user_id: demo.id, friend_id: u11.id})
        Friendship.create!({user_id: demo.id, friend_id: u12.id})
        Friendship.create!({user_id: demo.id, friend_id: u13.id})
        Friendship.create!({user_id: demo.id, friend_id: u14.id})
        Friendship.create!({user_id: demo.id, friend_id: u15.id})
        Friendship.create!({user_id: demo.id, friend_id: u16.id})
        Friendship.create!({user_id: demo.id, friend_id: u17.id})
        Friendship.create!({user_id: demo.id, friend_id: u18.id})
        Friendship.create!({user_id: demo.id, friend_id: u19.id})
        Friendship.create!({user_id: demo.id, friend_id: u20.id})
        Friendship.create!({user_id: demo.id, friend_id: u21.id})
        Friendship.create!({user_id: demo.id, friend_id: u22.id})
        Friendship.create!({user_id: demo.id, friend_id: u23.id})
        Friendship.create!({user_id: demo.id, friend_id: u24.id})
        Friendship.create!({user_id: demo.id, friend_id: u25.id})
        Friendship.create!({user_id: demo.id, friend_id: u26.id})
        Friendship.create!({user_id: demo.id, friend_id: u27.id})
        Friendship.create!({user_id: demo.id, friend_id: u28.id})
    end

    c1 = Conversation.create!({user1_id: u1.id, user2_id: u3.id})
    c2 = Conversation.create!({user1_id: u1.id, user2_id: u4.id})
    c3 = Conversation.create!({user1_id: u1.id, user2_id: u5.id})

    demo_users.each do |demo|
        c4 = Conversation.create!({user1_id: demo.id, user2_id: u6.id})
        Message.create!({content: "Nice to meet you! I am Aria Bot! Say anything to start a conversation, or type 'RESET' to start a new one", author_id: u6.id, location_id: c4.id, location_type: "Conversation"})
        c5 = Conversation.create!({user1_id: demo.id, user2_id: u7.id})
        c6 = Conversation.create!({user1_id: demo.id, user2_id: u8.id})
        c7 = Conversation.create!({user1_id: demo.id, user2_id: u9.id})
        c8 = Conversation.create!({user1_id: demo.id, user2_id: u10.id})
        c9 = Conversation.create!({user1_id: demo.id, user2_id: u11.id})
        c10 =Conversation.create!({user1_id: demo.id, user2_id: u12.id})
        c11 = Conversation.create!({user1_id: demo.id, user2_id: u13.id})
        c12 = Conversation.create!({user1_id: demo.id, user2_id: u14.id})
    end
    # c13 = Conversation.create!({user1_id: u1.id, user2_id: u15.id})
    # c14 = Conversation.create!({user1_id: u1.id, user2_id: u16.id})
    # c15 = Conversation.create!({user1_id: u1.id, user2_id: u17.id})
    # c16 = Conversation.create!({user1_id: u1.id, user2_id: u18.id})
    # c17 = Conversation.create!({user1_id: u1.id, user2_id: u19.id})
    # c18 = Conversation.create!({user1_id: u1.id, user2_id: u20.id})
    

    s1 = Server.create!({server_link: "appacademy", owner_id: u1.id, name: "App Academy"})
    s2 = Server.create!({server_link: "leagueoflegends", owner_id: u4.id, name: "League of Legends"})
    s3 = Server.create!({server_link: "bob", owner_id: u4.id, name: "Bob and Friends"})
    s4 = Server.create!({server_link: "dissonance", owner_id: u10.id, name: "Dissonance Official Server"})
    s4.icon.attach(io: File.open("app/assets/images/1.png"), filename: '1.png')

    erob = Server.find(s4.id)
    erobb = Channel.find(erob.channels.first.id)
    erobb.name = "Welcome"
    erobb.temp = 1
    erobb.save!

    # byebug
    # s4.channels.first.name = "Welcome"

    ch1 = Channel.create!({server_id: s1.id, name:"help", description:"Ask for help here!"})
    ch2 = Channel.create!({server_id: s1.id, name:"memes"})
    ch3 = Channel.create!({server_id: s2.id, name:"league", description:"Talk about LoL or other Riot games"})
    ch4 = Channel.create!({server_id: s2.id, name:"find-players", description:"Find other players!"})
    ch5 = Channel.create!({server_id: s1.id, name:"count-to-1000", description: "Main purpose is to test the functionality of infinite scroller"})
    ch6 = Channel.create!({server_id: s4.id, name:"Announcements", description: "Announcements of new and upcoming features of Dissonance!", temp: 1})
    ch7 = Channel.create!({server_id: s4.id, name: "General", description: "Type !commands to use the Dino bot!", temp: 2})

    r1 = Role.create!({name: "Challenger", color: "#E74C3C", server_id: 2})
    r2 = Role.create!({name: "Coach", color: "#AD1457", server_id: 2})
    r3 = Role.create!({name: "Bronze", color: "#1ABC9C", server_id: 2})
    r4 = Role.create!({name: "TFT", color: "#546E7A", server_id: 2})
    r5 = Role.create!({name: "Student", color: "#3498DB", server_id: 1})
    r6 = Role.create!({name: "Coach", color: "#9B59B6", server_id: 1})
    r7 = Role.create!({name: "Teacher", color: "#206694", server_id: 1})
    r8 = Role.create!({name: "Guest", server_id: 3})


    sj1 = ServerJoin.create!({user_id: u1.id, server_id: s2.id, nickname: "bob"})
    sj2 = ServerJoin.create!({user_id: u1.id, server_id: s3.id, nickname: "bobby"})
    sj3 = ServerJoin.create!({user_id: u2.id, server_id: s1.id, nickname: "SpongeBob"})
    sj4 = ServerJoin.create!({user_id: u2.id, server_id: s2.id})
    sj6 = ServerJoin.create!({user_id: u3.id, server_id: s1.id})
    sj7 = ServerJoin.create!({user_id: u8.id, server_id: s1.id})
    sj8 = ServerJoin.create!({user_id: u12.id, server_id: s1.id})
    sj9 = ServerJoin.create!({user_id: u22.id, server_id: s1.id})
    sj10 = ServerJoin.create!({user_id: u24.id, server_id: s2.id})
    sj11 = ServerJoin.create!({user_id: u10.id, server_id: s2.id})
    sj12 = ServerJoin.create!({user_id: u2.id, server_id: s3.id})
    sj13 = ServerJoin.create!({user_id: u3.id, server_id: s2.id})
    sj14 = ServerJoin.create!({user_id: u3.id, server_id: s3.id})
    sj15 = ServerJoin.create!({user_id: u4.id, server_id: s1.id})
    sj18 = ServerJoin.create!({user_id: u5.id, server_id: s1.id})
    sj19 = ServerJoin.create!({user_id: u5.id, server_id: s2.id})
    sj20 = ServerJoin.create!({user_id: u5.id, server_id: s3.id})

    demo_users.each do |usr|
        ServerJoin.create!({user_id: usr.id, server_id: s4.id})
    end

    sj21 = ServerJoin.create!({user_id: u29.id, server_id: s4.id})

    z1 = ServerRoleJoin.create!({server_join_id: sj1.id, role_id: r1.id})
    z2 = ServerRoleJoin.create!({server_join_id: sj1.id, role_id: r2.id})
    z3 = ServerRoleJoin.create!({server_join_id: sj1.id, role_id: r4.id})
    z4 = ServerRoleJoin.create!({server_join_id: sj2.id, role_id: r8.id})

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

    for i in 0...300
        if(i.even?)
            Message.create!({content: i, author_id: u2.id, location_id: ch5.id, location_type: "Channel"})
        else
            Message.create!({content: i, author_id: u3.id, location_id: ch5.id, location_type: "Channel"})
        end
    end

    Message.create!({content: "__Welcome to Dissonance!__", author_id: u10.id, location_id: erobb.id, location_type: "Channel"})
    Message.create!({content: "Please visit #General and type **!commands** to use Dino Bot, our local guide who helps people around the app.", author_id: u10.id, location_id: erobb.id, location_type: "Channel"})
    Message.create!({content: "For new and upcoming features, visit #Announcements to find out more.", author_id: u10.id, location_id: erobb.id, location_type: "Channel"})
    m3 = Message.create!({content: "Enjoy your stay!", author_id: u10.id, location_id: erobb.id, location_type: "Channel"})
    m3.image.attach(io: File.open("app/assets/images/wumpus.webp"), filename: 'wumpus.webp')

    Message.create!({content: "**Dissonance v 0.81 Released**", author_id: u10.id, location_id: ch6.id, location_type: "Channel"})
    Message.create!({content: "New features include: Customized search with Regex\nImage Upload preview bubbles", author_id: u10.id, location_id: ch6.id, location_type: "Channel"})
    Message.create!({content: "Upcoming features include: Finish two major AI bots (Aria and Dino), better seeding, and message options most notably bold, italics, and linking channels", author_id: u10.id, location_id: ch6.id, location_type: "Channel"})
    
