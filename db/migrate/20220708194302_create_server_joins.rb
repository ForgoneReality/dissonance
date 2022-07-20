class CreateServerJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :server_role_joins do |t|
      t.integer :server_id, null: false
      t.integer :role_id, null: false
      t.timestamps
    end
    add_index :server_joins, [:server_id, :role_id], unique: true
    add_index :server_joins, :server_id
  end
end
