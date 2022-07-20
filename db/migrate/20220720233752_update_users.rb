class UpdateUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_login, :integer, null: false
    add_column :conversations, :last_updated, :integer, null: false
  end
end
