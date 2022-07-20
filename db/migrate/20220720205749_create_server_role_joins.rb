class CreateServerRoleJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :server_role_joins do |t|
      t.integer :server_join_id, null: false
      t.integer :role_id, null: false
      t.timestamps
    end
    add_index :server_role_joins, [:server_join_id, :role_id], unique: true
    add_index :server_role_joins, :role_id
  end

end
