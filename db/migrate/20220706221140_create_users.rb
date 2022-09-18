class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :username, null: false
      t.string :fourdigit_id, null: false
      t.string :status, null: false, default: "offline"
      t.string :bio, default: ""
      t.integer :last_login
      t.string :session_token, null: false
      t.integer :special_id, default: 0 #1: Aria Bot, #2 demo? might not need demo, #3 etc
      # t.integer :

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, [:username, :fourdigit_id], unique: true
  end
end