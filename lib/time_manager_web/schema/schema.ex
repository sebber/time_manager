defmodule TimeManagerWeb.Schema do
  use Absinthe.Schema
  import_types TimeManagerWeb.Schema.ContentTypes
  import_types Absinthe.Type.Custom

  alias TimeManagerWeb.Resolvers

  query do
    @desc "Get all events"
    field :events, list_of(:event) do
      arg :from, :naive_datetime
      resolve &Resolvers.Content.list_events/3
    end
  end
end