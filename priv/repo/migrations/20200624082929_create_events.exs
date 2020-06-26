defmodule TimeManager.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :title, :string
      add :start, :naive_datetime
      add :end, :naive_datetime

      timestamps()
    end

  end
end
