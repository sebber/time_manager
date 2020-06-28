defmodule TimeManagerWeb.Schema do
  use Absinthe.Schema
  import_types TimeManagerWeb.Schema.ContentTypes
  import_types Absinthe.Type.Custom

  alias TimeManagerWeb.Resolvers

  query do
    @desc "Get all events"
    field :events, list_of(:event) do
      arg :from, :naive_datetime
      arg :to, :naive_datetime
      arg :order_by, :string
      resolve &Resolvers.Content.list_events/3
    end
  end

  mutation do
    @desc "Create a post"
    field :create_event, type: :event do
      arg :title, non_null(:string)
      arg :start, non_null(:naive_datetime)
      arg :end, non_null(:naive_datetime)
  
      resolve &Resolvers.Content.create_event/3
    end
  end
end