class Server < ApplicationRecord

    after_save :has_a_channel

    # after_create :owner_is_a_user

    validates :server_link, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\z/ }, length: {maximum: 32}
    validates :name, :owner_id, presence: true

    validates :name, length: {maximum: 32}
    
    has_many :users_joined, 
    class_name: "ServerJoin",
    foreign_key: :server_id,
    primary_key: :id, dependent: :destroy

    has_many :users, through: :users_joined, source: :user

    belongs_to :owner, class_name: "User", foreign_key: :owner_id, primary_key: :id

    has_many :channels, class_name: "Channel", foreign_key: :server_id, dependent: :destroy

    has_one_attached :icon
    #has_many roles

    def has_a_channel
        if (self.channels.size < 1)
            Channel.create({server_id: self.id, name:"general"})
        end
    end

    # def owner_is_a_user
    #     if !self.users.include?(self.owner)
    #         ServerJoin.create({server_id: self.id, user_id: self.owner.id})
    #     end
    # end
    
end
