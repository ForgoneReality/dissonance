class CreateServerJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :server_joins do |t|
      t.integer :user_id, null: false
      t.integer :server_id, null: false
      t.string :nickname, default: nil
      t.timestamps
    end
    add_index :server_joins, [:user_id, :server_id], unique: true
    add_index :server_joins, :server_id
  end
end
