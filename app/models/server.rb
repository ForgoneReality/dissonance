class Server < ApplicationRecord

    after_save :has_a_channel

    after_create :owner_is_a_user
    before_save :has_server_link

    validates :server_link, uniqueness: {allow_blank: true},  length: {maximum: 32}
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
    has_many :roles, class_name: "Role", foreign_key: :server_id, dependent: :destroy, primary_key: :id

    def has_a_channel
        if (self.channels.size < 1)
            Channel.create({server_id: self.id, name:"general"})
        end
    end

    def owner_is_a_user
        if !self.users.include?(self.owner)
            ServerJoin.create({server_id: self.id, user_id: self.owner.id})
        end
    end
    
    def has_server_link
        if(!self.server_link)
            possible_link = SecureRandom.urlsafe_base64(9)
            while(Server.find_by(server_link: possible_link) != nil)
                possible_link = SecureRandom.urlsafe_base64(9)
            end
            self.server_link = possible_link
        end
    end
end
