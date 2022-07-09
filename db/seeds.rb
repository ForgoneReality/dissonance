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

    Conversation.create!({user1_id: 1, user2_id: 3})
    Conversation.create!({user1_id: 1, user2_id: 4})

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

    # create_table "users", force: :cascade do |t|
    #     t.string "email", null: false
    #     t.string "password_digest", null: false
    #     t.string "username", null: false
    #     t.string "fourdigit_id", null: false
    #     t.string "status", default: "online", null: false
    #     t.string "bio"
    #     t.string "session_token", null: false
    #     t.datetime "created_at", null: false
    #     t.datetime "updated_at", null: false
    #     t.index ["email"], name: "index_users_on_email", unique: true
    #     t.index ["session_token"], name: "index_users_on_session_token", unique: true
    #     t.index ["username", "fourdigit_id"], name: "index_users_on_username_and_fourdigit_id", unique: true
    #   end