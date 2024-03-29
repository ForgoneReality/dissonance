require 'open-uri'

class Message < ApplicationRecord
    validates :content, :author_id, presence: true
    validates :pinned, inclusion: { in: [ true, false ] }
    validates :edited, inclusion: { in: [ true, false ] }
    validates :content, length: {maximum: 4000}

    validates :location_id, :location_type, presence: true

    belongs_to :location, polymorphic: true
    belongs_to :author, foreign_key: :author_id, class_name: "User"

    has_one_attached :image
end