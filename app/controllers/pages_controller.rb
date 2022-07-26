require 'csv'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :english, :download]

  def admin
    if current_user.admin
      @systems = System.all
      @system = System.new
    else
      redirect_to root_path
    end
  end

  def position
    @almirantado_int_data = get_drifter(@almirantado_int)
    @almirantado_int = System.where("name ='almirantado_int' ") [0]    
  end

  def home
    if params[:commit]
      @popup = false
      start_date = params[:start_date]
      end_date = params[:end_date]
      start_date = Date.parse start_date
      end_date = Date.parse end_date
    else
      @popup = true
      start_date = (Time.now - 1.day)
      end_date = (Time.now + 1.day)
    end
    if start_date == nil
      start_date = (Time.now - 5.day)
    end
    if end_date == nil
      end_date = Time.now + 1.day
    end
    if start_date < (Time.now - 5.day)
      start_date = (Time.now - 5.day)
    end
    if end_date < start_date
      end_date = Time.now + 1.day
    end

    @start_date = start_date
    @end_date = end_date
    @almirantado_int = System.where("name ='almirantado_int' ")[0]    
    @almirantado_int_data = get_remobs(@almirantado_int, start_date, end_date)
    @systems = System.all
    @systems_data = get_systems(@systems[1,3], start_date, end_date)
  end

  private

  def get_systems(stations, start_date, end_date)
    systems_data = []
    stations.each_with_index do |station, idx|
      begin
        response = RestClient.get("https://remobsapi.herokuapp.com/api/v1/data_stations/station?station_id=#{station.buoy_id}&start_date=#{start_date.strftime("%Y-%m-%dT00:00:00")}&end_date=#{end_date.strftime("%Y-%m-%dT00:00:00")}&token=#{ENV["REMOBS_TOKEN"]}")
        remobs_response = JSON.parse(response)
        params = {}
        params[:date_time] = []
        params[:wspd] = []
        params[:wdir] = []
        params[:atmp] = []
        params[:rh] = []
        params[:dewpt] = []
        params[:visibility] = []
        remobs_response.each do |item|
          params[:wspd] << (item['wspd'].to_f).round(1)
          params[:wdir] << (item['wdir'].to_i)
          params[:atmp] << (item['atmp'].to_f).round(1)
          params[:rh] << (item['rh'].to_f).round(1)
          params[:dewpt] << (item['dewpt'].to_f).round(1)
          params[:visibility] << (item['visibility'].to_f).round(1)
          params[:date_time] << Time.parse(item['date_time'])
        end
        systems_data << params
      rescue
        systems_data << {}
      end
    end
    return systems_data
  end

  def get_remobs(buoy, start_date, end_date)
    if buoy.buoy_id

      begin
        response = RestClient.get("http://remobsapi.herokuapp.com/api/v1/data_buoys?buoy=#{buoy.buoy_id.to_i}&start_date=#{start_date.strftime("%Y-%m-%d")}&end_date=#{end_date.strftime("%Y-%m-%d")}&token=#{ENV["REMOBS_TOKEN"]}")
        remobs_response = JSON.parse(response)

        params = {}
        params[:buoy_id] = []
        params[:swvht] = []
        params[:tp] = []
        params[:sst] = []
        params[:wvdir] = []
        params[:wspd] = []
        params[:wdir] = []
        params[:wvdirg] = []
        params[:wdirg] = []
        params[:date_time] = []
        params[:date_time_swvht] = []
        params[:date_time_tp] = []
        params[:date_time_sst] = []
        params[:date_time_wvdir] = []
        params[:date_time_wspd] = []
        params[:date_time_wdir] = []
        params[:date_time_wvdirg] = []
        params[:date_time_wdirg] = []
        
        remobs_response.each do |item|
          params[:buoy_id] << item['buoy_id']

          if item['flag_swvht'].to_i > 0
            params[:swvht] << nil
          else
            params[:swvht] << item['swvht1'].to_f
          end
          if params[:swvht][-1]
            params[:date_time_swvht] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_swvht] << nil
          end
          
          if item['flag_tp'].to_i > 0
            params[:tp] << nil
          else
            params[:tp] << item['tp1'].to_f
          end
          if params[:tp][-1]
            params[:date_time_tp] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_tp] << nil
          end

          if item['flag_sst'].to_i > 0
            params[:sst] << nil
          else
            params[:sst] << item['sst'].to_f
          end
          if params[:sst][-1]
            params[:date_time_sst] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_sst] << nil
          end


          if item['flag_wdir'].to_i > 0
            params[:wdir] << nil
          else
            params[:wdir] << item['wdir'].to_i
          end
          if params[:wdir][-1]
            params[:date_time_wdir] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_wdir] << nil
          end

          if item['flag_wdir'].to_i > 0
            params[:wdirg] << nil
          else
            params[:wdirg] << (item['wdir'].to_i/10)*10
          end
          if params[:wdirg][-1]
            params[:date_time_wdirg] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_wdirg] << nil
          end

          params[:wspd] << item['wspd'].to_f
          if params[:wspd][-1]
            params[:date_time_wspd] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_wspd] << nil
          end

          if item['flag_wvdir'].to_i > 0
            params[:wvdir] << nil
          else
            params[:wvdir] << item['wvdir1'].to_f
          end
          if params[:wvdir][-1]
            params[:date_time_wvdir] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_wvdir] << nil
          end

          if item['flag_wvdir'].to_i > 0
            params[:wvdirg] << nil
          else
            params[:wvdirg] << (item['wvdir1'].to_i/10)*10
          end
          if params[:wvdirg][-1]
            params[:date_time_wvdirg] << Time.parse(item['date_time']) - 2.hour
          else
            params[:date_time_wvdirg] << nil
          end

          params[:date_time] << Time.parse(item['date_time']) - 2.hour
        end
        return params
      rescue
        return {}
      end
    else
      return {}
    end
  end
end
