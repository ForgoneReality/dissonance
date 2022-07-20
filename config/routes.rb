mount ActionCable.server => '/cable'

Rails.application.routes.draw do
  get 'api/Message'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update] do
      get :conversations, on: :member
      get :friends, on: :member
      get :search, on: :collection
      get :servers, on: :member

    end
    resource :session, only: [:create, :destroy] do
      post :demo, on: :collection
    end
    resources :conversations, only: [:show, :create, :update]
    resources :servers, only: [:show, :index, :create, :update, :destroy] do
      get :mainchannel, on: :member
    end
    resources :joined_servers, only: [:create, :destroy]
    resources :channels, only: [:show, :index, :create, :update, :destroy]
    resources :messages, only: [:create, :update, :destroy]
    resources :friendships, only: [:create, :destroy]
  end
end