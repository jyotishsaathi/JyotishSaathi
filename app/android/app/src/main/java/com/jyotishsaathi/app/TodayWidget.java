package com.jyotishsaathi.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import org.json.JSONObject;

/** Home-screen widget: today's tithi, Rahu Kaal and one line of rashifal. The app saves the text each day. */
public class TodayWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) manager.updateAppWidget(id, build(context));
    }

    static RemoteViews build(Context context) {
        RemoteViews v = new RemoteViews(context.getPackageName(), R.layout.today_widget);
        SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        String raw = prefs.getString("widget", null);
        if (raw != null) {
            try {
                JSONObject o = new JSONObject(raw);
                v.setTextViewText(R.id.w_title, o.optString("name") + " · " + o.optString("rashi") + "  " + o.optString("stars"));
                v.setTextViewText(R.id.w_line, o.optString("line"));
                v.setTextViewText(R.id.w_tithi, o.optString("date") + " · " + o.optString("tithi"));
                v.setTextViewText(R.id.w_rahu, o.optString("rahu"));
            } catch (Exception e) {
                // keep the default text
            }
        }
        Intent open = new Intent(context, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(context, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        v.setOnClickPendingIntent(R.id.w_root, pi);
        return v;
    }

    public static void refreshAll(Context context) {
        AppWidgetManager m = AppWidgetManager.getInstance(context);
        int[] ids = m.getAppWidgetIds(new ComponentName(context, TodayWidget.class));
        for (int id : ids) m.updateAppWidget(id, build(context));
    }
}
