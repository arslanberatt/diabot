import matplotlib
matplotlib.use('Agg')  # Non-interactive backend to avoid tkinter errors on Windows
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap
import warnings
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_curve, auc
from imblearn.under_sampling import RandomUnderSampler
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC
import sys
import io

# En iyi modeli kaydetmek için joblib kullanıyoruz.
import joblib
import os

# Windows terminal encoding sorununu çöz
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8') 
# Klasör yapısını oluştur
os.makedirs('models', exist_ok=True)

data_path = "./data/diabetes_prediction_dataset.csv"
df = pd.read_csv(data_path, delimiter=",")

print("="*50)
print("DIABETES VERI ANALIZI")
print("="*50)
print(f"Veri boyutu: {df.shape[0]} satır x {df.shape[1]} sütun\n")

# İlk birkaç satırı göster
print("İlk 5 satır:")
print(df.head())
print("\n")

# Diabetes dağılımı
print(f"Diabetes dağılımı:")
print(df['diabetes'].value_counts())
print(f"\nDiabetes oranı: {df['diabetes'].mean()*100:.2f}%")
print(f"Diyabet olmayan oranı: {(1-df['diabetes'].mean())*100:.2f}%\n")

# Kategorik sütunları belirle
categorical_cols = ["gender", "smoking_history"]
label_encoders = {}

for col in categorical_cols:
    if col in df.columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = dict(zip(le.classes_, le.transform(le.classes_)))

print("Kategorik sutunlar encode edildi\n")

# Feature ve target ayırma
X = df.drop("diabetes", axis=1)
y = df["diabetes"]

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42, test_size=0.2, stratify=y)

print(f"Train set boyutu: {X_train.shape}")
print(f"Test set boyutu: {X_test.shape}")
print(f"Train set diabetes sayısı:\n{y_train.value_counts()}\n")

# --- DECISION TREE MODELİ ---

print("="*50)
print("DECISION TREE MODELI")
print("="*50)

dt = DecisionTreeClassifier(class_weight="balanced", random_state=42)
dt.fit(X_train, y_train)
y_pred_dt = dt.predict(X_test)
accuracy_dt = accuracy_score(y_test, y_pred_dt)

print(f"Genel Dogruluk Orani: {accuracy_dt:.4f}")

classification_rep_dt = classification_report(y_test, y_pred_dt, zero_division=1)
print("\nDetayli Rapor:")
print(classification_rep_dt)

# Confusion Matrix
conf_matrix_dt = confusion_matrix(y_test, y_pred_dt)

plt.figure(figsize=(6, 4))
sns.heatmap(conf_matrix_dt, annot=True, fmt="d", cmap="BuGn", 
            xticklabels=["No Diabetes", "Diabetes"], 
            yticklabels=["No Diabetes", "Diabetes"])
plt.xlabel("Tahmin")
plt.ylabel("Gerçek Durum")
plt.title("Decision Tree - Confusion Matrix")
plt.tight_layout()
plt.savefig('models/decision_tree_confusion_matrix.png', dpi=150)
print("Confusion matrix kaydedildi: models/decision_tree_confusion_matrix.png")
plt.close()

# ROC Curve
y_prob_dt = dt.predict_proba(X_test)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_prob_dt)
roc_auc_dt = auc(fpr, tpr)

plt.figure(figsize=(6, 4))
plt.plot(fpr, tpr, color="green", lw=2, label=f"ROC curve (AUC = {roc_auc_dt:.2f})")
plt.plot([0, 1], [0, 1], color="gray", linestyle="--")
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel("Yanlış Pozitif Oranı (FPR)")
plt.ylabel("Doğru Pozitif Oranı (TPR)")
plt.title("Decision Tree - ROC Eğrisi")
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig('models/decision_tree_roc.png', dpi=150)
print(f"ROC egrisi kaydedildi: models/decision_tree_roc.png")
print(f"Decision Tree AUC degeri: {roc_auc_dt:.4f}\n")
plt.close()

# --- UNDERSAMPLING İLE DECISION TREE ---

print("="*50)
print("UNDERSAMPLING ILE DECISION TREE")
print("="*50)

rus = RandomUnderSampler(random_state=42)
X_resampled, y_resampled = rus.fit_resample(X, y)
unique, counts = np.unique(y_resampled, return_counts=True)
undersampling_result = dict(zip(unique, counts))

print(f"Undersampling sonrası dağılım: {undersampling_result}\n")

X_train_under, X_test_under, y_train_under, y_test_under = train_test_split(
    X_resampled, y_resampled, test_size=0.2, random_state=43, stratify=y_resampled
)

dt_undersampled = DecisionTreeClassifier(random_state=42)
dt_undersampled.fit(X_train_under, y_train_under)
y_pred_undersampled = dt_undersampled.predict(X_test_under)
accuracy_undersampled = accuracy_score(y_test_under, y_pred_undersampled)

print(f"Undersampling sonrasi accuracy: {accuracy_undersampled:.4f}")

conf_matrix_undersampled = confusion_matrix(y_test_under, y_pred_undersampled)

plt.figure(figsize=(6, 4))
sns.heatmap(conf_matrix_undersampled, annot=True, fmt="d", cmap="BuGn",
            xticklabels=["No Diabetes", "Diabetes"],
            yticklabels=["No Diabetes", "Diabetes"])
plt.xlabel("Tahmin")
plt.ylabel("Gerçek Durum")
plt.title("Undersampling Sonrası Decision Tree - Confusion Matrix")
plt.tight_layout()
plt.savefig('models/decision_tree_undersampled_confusion_matrix.png', dpi=150)
print("Confusion matrix kaydedildi")
plt.close()

y_prob_undersampled = dt_undersampled.predict_proba(X_test_under)[:, 1]
fpr, tpr, _ = roc_curve(y_test_under, y_prob_undersampled)
roc_auc_under = auc(fpr, tpr)

plt.figure(figsize=(6, 4))
plt.plot(fpr, tpr, color="green", lw=2, label=f"ROC curve (AUC = {roc_auc_under:.2f})")
plt.plot([0, 1], [0, 1], color="gray", linestyle="--")
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel("Yanlis Pozitif Orani (FPR)")
plt.ylabel("Dogru Pozitif Orani (TPR)")
plt.title("Undersampling Sonrasi Decision Tree - ROC Egrisi")
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig('models/decision_tree_undersampled_roc.png', dpi=150)
print(f"ROC egrisi kaydedildi")
print(f"Undersampling AUC degeri: {roc_auc_under:.4f}\n")
plt.close()

# --- RANDOM FOREST MODELİ ---

print("="*50)
print("RANDOM FOREST MODELI")
print("="*50)

# Grid Search ile en iyi parametreleri bul
print("Grid Search ile en iyi parametreler araniyor...")
param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [None, 10, 20, 30],
    "min_samples_split": [2, 5, 10],
    "min_samples_leaf": [1, 2, 4],
    "bootstrap": [True, False]
}
grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, scoring="roc_auc", n_jobs=-1)
grid_search.fit(X_train_under, y_train_under)

print(f"En iyi parametreler: {grid_search.best_params_}")
print(f"En iyi skor: {grid_search.best_score_:.4f}\n")

# En iyi parametrelerle model oluştur
rf = RandomForestClassifier(
    bootstrap=True,
    max_depth=None,
    min_samples_leaf=4,
    min_samples_split=10,
    n_estimators=200,
    random_state=42
)
rf.fit(X_train_under, y_train_under)
y_pred_rf = rf.predict(X_test_under)
accuracy_rf = accuracy_score(y_test_under, y_pred_rf)

print(f"Random Forest accuracy: {accuracy_rf:.4f}")

conf_matrix_rf = confusion_matrix(y_test_under, y_pred_rf)
plt.figure(figsize=(6, 4))
sns.heatmap(conf_matrix_rf, annot=True, fmt="d", cmap="BuGn",
            xticklabels=["No Diabetes", "Diabetes"],
            yticklabels=["No Diabetes", "Diabetes"])
plt.xlabel("Tahmin")
plt.ylabel("Gerçek Durum")
plt.title("Random Forest - Confusion Matrix")
plt.tight_layout()
plt.savefig('models/random_forest_confusion_matrix.png', dpi=150)
print("Confusion matrix kaydedildi")
plt.close()

y_prob_rf = rf.predict_proba(X_test_under)[:, 1]
fpr, tpr, _ = roc_curve(y_test_under, y_prob_rf)
roc_auc_rf = auc(fpr, tpr)

plt.figure(figsize=(6, 4))
plt.plot(fpr, tpr, color="green", lw=2, label=f"ROC curve (AUC = {roc_auc_rf:.2f})")
plt.plot([0, 1], [0, 1], color="gray", linestyle="--")
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel("Yanlis Pozitif Orani (FPR)")
plt.ylabel("Dogru Pozitif Orani (TPR)")
plt.title("Random Forest - ROC Egrisi")
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig('models/random_forest_roc.png', dpi=150)
print(f"ROC egrisi kaydedildi")
print(f"Random Forest AUC degeri: {roc_auc_rf:.4f}\n")
plt.close()

# --- SUPPORT VECTOR CLASSIFIER ---

print("="*50)
print("SUPPORT VECTOR CLASSIFIER")
print("="*50)

svc = SVC(probability=True, kernel='rbf', random_state=42)
svc.fit(X_train_under, y_train_under)
y_pred_svc = svc.predict(X_test_under)
y_prob_svc = svc.predict_proba(X_test_under)[:, 1]
accuracy_svc = accuracy_score(y_test_under, y_pred_svc)

print(f"SVC accuracy: {accuracy_svc:.4f}")

classification_rep_svc = classification_report(y_test_under, y_pred_svc, zero_division=1)
print("\nDetayli Rapor:")
print(classification_rep_svc)

conf_matrix_svc = confusion_matrix(y_test_under, y_pred_svc)
plt.figure(figsize=(6, 4))
sns.heatmap(conf_matrix_svc, annot=True, fmt="d", cmap="BuGn",
            xticklabels=["No Diabetes", "Diabetes"],
            yticklabels=["No Diabetes", "Diabetes"])
plt.xlabel("Tahmin")
plt.ylabel("Gerçek Durum")
plt.title("Support Vector Classifier - Confusion Matrix")
plt.tight_layout()
plt.savefig('models/svc_confusion_matrix.png', dpi=150)
print("Confusion matrix kaydedildi")
plt.close()

fpr, tpr, _ = roc_curve(y_test_under, y_prob_svc)
roc_auc_svc = auc(fpr, tpr)

plt.figure(figsize=(6, 4))
plt.plot(fpr, tpr, color="green", label=f"ROC curve (AUC = {roc_auc_svc:.2f})")
plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
plt.xlabel("Yanlis Pozitif Orani (FPR)")
plt.ylabel("Dogru Pozitif Orani (TPR)")
plt.title("Support Vector Classifier - ROC Egrisi")
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig('models/svc_roc.png', dpi=150)
print(f"ROC egrisi kaydedildi")
print(f"SVC AUC degeri: {roc_auc_svc:.4f}\n")
plt.close()

# --- EN İYİ MODELİ SEÇ VE KAYDET ---

print("="*50)
print("MODEL KAYDETME")
print("="*50)

# AUC değerlerine göre en iyi modeli seç
model_scores = {
    'Random Forest': roc_auc_rf,
    'SVC': roc_auc_svc,
    'Decision Tree (Undersampled)': roc_auc_under
}

best_model_name = max(model_scores, key=model_scores.get)
best_model = rf if best_model_name == 'Random Forest' else (svc if best_model_name == 'SVC' else dt_undersampled)

print(f"En iyi model: {best_model_name} (AUC: {model_scores[best_model_name]:.4f})")

# Modeli kaydet
joblib.dump(best_model, './models/best_diabetes_model.pkl')
print("Model kaydedildi: models/best_diabetes_model.pkl")

# Label encoder'lari da kaydet
joblib.dump(label_encoders, './models/diabetes_label_encoders.pkl')
print("Encoder'lar kaydedildi: models/diabetes_label_encoders.pkl")

# Feature sirasini kaydet (predict icin gerekli)
feature_order = list(X.columns)
joblib.dump(feature_order, './models/diabetes_feature_order.pkl')
print("Feature sirasi kaydedildi: models/diabetes_feature_order.pkl")

print("\n" + "="*50)
print("TUM MODELLER EGITILDI VE KAYDEDILDI!")
print("="*50)
