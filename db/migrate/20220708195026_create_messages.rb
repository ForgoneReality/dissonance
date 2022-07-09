class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.integer :author_id, null: false
      t.references :location, null: false, polymorphic: true
      t.boolean :pinned, default: false
      t.timestamps
    end

    add_index :messages, :author_id
  end
end
