# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

    User.create!({email: "cxcharlie@gmail.com", password: "123456", username: "helios", fourdigit_id: "1234"})
    User.create!({email: "anthonie@gmail.com", password: "111111", username: "ant", fourdigit_id: "0313"})
    User.create!({email: "lucy@gmail.com", password: "lucy12", username: "lucy", fourdigit_id: "4059"})
    User.create!({email: "billy@gmail.com", password: "aaaaaa", username: "Billy Bob", fourdigit_id: "4095"})
    User.create!({email: "bro@gmail.com", password: "111111", username: "bro", fourdigit_id: "4023"})

    Conversation.create!({user1_id: 1, user2_id: 3})
    Conversation.create!({user1_id: 1, user2_id: 4})
    Conversation.create!({user1_id: 1, user2_id: 5})


    Server.create!({server_link: "appacademy", owner_id: 1, name: "App Academy"})
    Server.create!({server_link: "leagueoflegends", owner_id: 4, name: "League of Legends"})
    Server.create!({server_link: "bob", owner_id: 4, name: "Bob's Home"})

    Channel.create!({server_id: 1, name:"general"})
    Channel.create!({server_id: 1, name:"help", description:"Ask for help here!"})

    ServerJoin.create!({user_id: 1, server_id: 2})
    ServerJoin.create!({user_id: 1, server_id: 1})
    ServerJoin.create!({user_id: 1, server_id: 3})
    ServerJoin.create!({user_id: 2, server_id: 2})
    ServerJoin.create!({user_id: 2, server_id: 3})
    ServerJoin.create!({user_id: 3, server_id: 1})
    ServerJoin.create!({user_id: 4, server_id: 2})
    ServerJoin.create!({user_id: 4, server_id: 3})

    Message.create!({content: "First!", author_id:1, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Second!", author_id:2, location_id: 1, location_type: "Channel"})
    Message.create!({content: "Sup it's bob.", author_id:4, location_id: 2, location_type: "Conversation"})
    Message.create!({content: "Hey bob! How you doing mate", author_id:1, location_id: 2, location_type: "Conversation"})
    Message.create!({content: "Not your business", author_id:4, location_id: 2, location_type: "Conversation"})
    Message.create!({content: "Just testing!", author_id:3, location_id: 1, location_type: "Conversation"})
    Message.create!({content: "Please work lol", author_id:5, location_id: 3, location_type: "Conversation"})
    
    