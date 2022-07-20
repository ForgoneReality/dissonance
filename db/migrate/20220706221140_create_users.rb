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

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, [:username, :fourdigit_id], unique: true
  end
end
