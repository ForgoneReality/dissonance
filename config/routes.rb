Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  get 'api/Message'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update] do
      get :conversations, on: :member
      get :friends, on: :member
      get :search, on: :collection
      get :servers, on: :member
      patch :changePFP, on: :member
      patch :nickname, on: :member
      patch :updateBio, on: :member
    end
    resource :session, only: [:create, :destroy] do
      post :demo, on: :collection
    end
    resources :conversations, only: [:show, :create, :update] do
      get :search, on: :collection
    end
    resources :servers, only: [:show, :index, :create, :update, :destroy] do
      get :mainchannel, on: :member
      get :getlink, on: :member
      patch :leave, on: :member #not good code... in wrong place
      patch :join, on: :member
      get :search, on: :member
    end
    resources :joined_servers, only: [:create, :destroy] #should be refactored to be used
    resources :channels, only: [:show, :index, :create, :update, :destroy] do
      get :display30, on: :member
    end
    resources :messages, only: [:create, :update, :destroy] do
      patch :pin, on: :member
    end
    resources :friendships, only: [:create, :destroy]
  end
end