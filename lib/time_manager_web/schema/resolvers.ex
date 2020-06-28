defmodule TimeManagerWeb.Resolvers.Content do
  alias TimeManager.Calendar

  def list_events(_parent, params, _resolution) do
    {:ok, Calendar.list_events(params)}
  end

  def create_event(_parent, params, _resolution) do
    Calendar.create_event(params)
  end

end