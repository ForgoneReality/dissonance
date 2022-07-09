class Channel < ApplicationRecord
    validates :name, :server_id, presence: true
    validates :name, :uniqueness => { :scope => :server_id}, length: {maximum: 32}
    

    has_many :messages, 
        class_name: "Message",
        as: :location

    belongs_to :server,
        class_name: "Server",
        foreign_key: :server_id,
        primary_key: :id
end

