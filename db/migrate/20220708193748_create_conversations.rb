class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.integer :user1_id, null: false
      t.integer :user2_id, null: false
      t.timestamps
  end
  add_index :conversations, [:user1_id, :user2_id], unique: true
  add_index :conversations, [:user2_id, :user1_id], unique: true
end
end