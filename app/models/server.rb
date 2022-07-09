class Server < ApplicationRecord

    validates :server_link, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\z/ }, length: {maximum: 32}
    validates :name, :owner_id, presence: true

    validates :name, length: {maximum: 32}
    
    has_many :users_joined, 
    class_name: "ServerJoin",
    foreign_key: :server_id,
    primary_key: :id

    has_many :users, through: :users_joined, source: :user

    belongs_to :owner, class_name: "User", foreign_key: :owner_id, primary_key: :id

    has_many :channels, class_name: "Channel", foreign_key: :server_id

    #has_many roles

end
