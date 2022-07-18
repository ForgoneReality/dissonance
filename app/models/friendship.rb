class Friendship < ApplicationRecord
    validates :user_id, :friend_id, presence: true

    validate :check_stuff 

    def check_stuff
        errors.add(:friend_id, "can't be the same as email") if self.user_id == self.friend_id

        fren = Friendship.find_by(user_id: self.user_id, friend_id: self.friend_id);
        if(fren)
            errors.add(:friend_id, "Friendship already exists!")
        end
    end

    belongs_to :user, 
        class_name: 'User', 
        foreign_key: :user_id
    
    belongs_to :friend,  
        class_name: 'User', 
        foreign_key: :friend_id

end
