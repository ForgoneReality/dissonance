class User < ApplicationRecord

    attr_reader :password

    after_initialize :ensure_session_token

    validates :email, presence: true, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :password_digest, :username, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validates :username, uniqueness: { scope: :fourdigit_id }

    validates :status, presence: true, inclusion: { in: %w(online idle busy offline)}
    validates :fourdigit_id, presence: true, format: { with: /\A[+-]?\d+\z/}, length: {is: 4}

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)

        if user && user.is_password?(password)
            return user
        end

        return nil
    end

    def password=(password)
        @password = password
        
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    # has_many :users, :friends

    has_many :servers_joined, 
        class_name: "ServerJoin",
        foreign_key: :user_id,
        primary_key: :id

    has_many :servers, through: :servers_joined, source: :server

    has_many :servers_owned, class_name: "Server", primary_key: :id, foreign_key: :owner_id

    has_many :messages, foreign_key: :author_id, class_name: "Message"

    def conversations
        Conversation.joins("INNER JOIN users ON users.id = conversations.user1_id OR users.id = conversations.user2_id").where("users.id = #{self.id}").uniq
    end

    
    
end
