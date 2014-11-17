class ChangeTypeToCategory < ActiveRecord::Migration
  def change
    rename_column :transactions, :type, :category
  end
end
