class CreateServerRoleJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :server_role_joins do |t|
      t.integer :serverjoin_id, null: false
      t.integer :role_id, null: false
      t.timestamps
    end
  end
  add_index :server_role_joins, [:serverjoin_id, :role_id], unique: true
  add_index :server_role_joins, :role_id
end
