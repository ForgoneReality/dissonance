class Conversation < ApplicationRecord

    # attr_accessor :last_updated

    after_initialize :init_last_updated
    validates :user1_id, :user2_id, presence: true
    validates :user1_id, uniqueness: { scope: :user2_id} 
    # validates :user2_id, uniqueness: { scope: :user1_id} 

    validate :check_duplicate 

    def init_last_updated
        self.last_updated = Time.current
    end

    def check_duplicate
        conversation = Conversation.find_by(user1_id: self.user2_id, user2_id: self.user1_id)
        if conversation
            errors.add(:user2_id, "Conversation already exists!")
        elsif self.user1_id == self.user2_id
            errors.add(:user2_id, "Cannot have a conversation with yourself...")
        end
    end

    belongs_to :user1, 
        class_name: 'User', 
        foreign_key: :user1_id
    belongs_to :user2,  
        class_name: 'User', 
        foreign_key: :user2_id

    has_many :messages, 
        class_name: "Message",
        as: :location


end
